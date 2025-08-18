using Kayra.Business;
using Kayra.Core.Pagination;
using Kayra.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Kayra.Api.Controllers.v1;

[ApiController]
[Route("api/v{version:apiVersion}/[controller]")]
[ApiVersion("1.0")]
[Produces("application/json")]
public class CategoriesController : ControllerBase
{
    private readonly ICategoryService _categoryService;

    public CategoriesController(ICategoryService categoryService)
    {
        _categoryService = categoryService;
    }

    /// <summary>
    /// Get all categories with pagination
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] PaginationQuery paginationQuery)
    {
        var result = await _categoryService.GetAllAsync(paginationQuery);
        return Ok(result);
    }

    /// <summary>
    /// Get category by ID
    /// </summary>
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var category = await _categoryService.GetByIdAsync(id);

        if (category == null)
            return NotFound();

        return Ok(category);
    }

    /// <summary>
    /// Get active categories
    /// </summary>
    [HttpGet("active")]
    public async Task<IActionResult> GetActive()
    {
        var categories = await _categoryService.GetActiveCategoriesAsync();
        return Ok(categories);
    }


    /// <summary>
    /// Create a new category
    /// </summary>
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Category category)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            var createdCategory = await _categoryService.CreateAsync(category);
            return CreatedAtAction(nameof(GetById), new { id = createdCategory.Id }, createdCategory);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    /// <summary>
    /// Update an existing category
    /// </summary>
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] Category category)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        if (id != category.Id)
            return BadRequest("ID mismatch");

        try
        {
            var updatedCategory = await _categoryService.UpdateAsync(category);
            return Ok(updatedCategory);
        }
        catch (InvalidOperationException)
        {
            return NotFound();
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    /// <summary>
    /// Delete a category
    /// </summary>
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            await _categoryService.DeleteAsync(id);
            return NoContent();
        }
        catch (InvalidOperationException)
        {
            return NotFound();
        }
    }
}
