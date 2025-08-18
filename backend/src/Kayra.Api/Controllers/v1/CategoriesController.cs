using AutoMapper;
using Kayra.Api.Dtos.Category;
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
    private readonly IMapper _mapper;

    public CategoriesController(ICategoryService categoryService, IMapper mapper)
    {
        _categoryService = categoryService;
        _mapper = mapper;
    }

    /// <summary>
    /// Get all categories with pagination
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<PagedResult<CategoryResponse>>> GetAll([FromQuery] PaginationQuery paginationQuery)
    {
        var result = await _categoryService.GetAllAsync(paginationQuery);
        var response = new PagedResult<CategoryResponse>
        {
            Items = _mapper.Map<IEnumerable<CategoryResponse>>(result.Items),
            TotalCount = result.TotalCount,
            PageNumber = result.PageNumber,
            PageSize = result.PageSize
        };
        return Ok(response);
    }

    /// <summary>
    /// Get category by ID
    /// </summary>
    [HttpGet("{id:int}")]
    public async Task<ActionResult<CategoryResponse>> GetById(int id)
    {
        var category = await _categoryService.GetByIdAsync(id);

        if (category == null)
            return NotFound();

        var response = _mapper.Map<CategoryResponse>(category);
        return Ok(response);
    }

    /// <summary>
    /// Get active categories
    /// </summary>
    [HttpGet("active")]
    public async Task<ActionResult<IEnumerable<CategoryResponse>>> GetActive()
    {
        var categories = await _categoryService.GetActiveCategoriesAsync();
        var response = _mapper.Map<IEnumerable<CategoryResponse>>(categories);
        return Ok(response);
    }

    /// <summary>
    /// Create a new category
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<CategoryResponse>> Create([FromBody] CreateCategoryRequest request)
    {
        try
        {
            var category = _mapper.Map<Category>(request);
            var createdCategory = await _categoryService.CreateAsync(category);
            var response = _mapper.Map<CategoryResponse>(createdCategory);
            return CreatedAtAction(nameof(GetById), new { id = createdCategory.Id }, response);
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
    public async Task<ActionResult<CategoryResponse>> Update(int id, [FromBody] UpdateCategoryRequest request)
    {
        if (id != request.Id)
            return BadRequest("ID mismatch");

        try
        {
            var category = _mapper.Map<Category>(request);
            var updatedCategory = await _categoryService.UpdateAsync(category);
            var response = _mapper.Map<CategoryResponse>(updatedCategory);
            return Ok(response);
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
