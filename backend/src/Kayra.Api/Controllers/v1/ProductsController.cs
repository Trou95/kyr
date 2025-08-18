using AutoMapper;
using Kayra.Api.Dtos.Product;
using Kayra.Business;
using Kayra.Core.Pagination;
using Kayra.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Kayra.Api.Controllers.v1;

[ApiController]
[Route("api/v{version:apiVersion}/[controller]")]
[ApiVersion("1.0")]
[Produces("application/json")]
public class ProductsController : ControllerBase
{
    private readonly IProductService _productService;
    private readonly IMapper _mapper;

    public ProductsController(IProductService productService, IMapper mapper)
    {
        _productService = productService;
        _mapper = mapper;
    }

    /// <summary>
    /// Get all products with pagination
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<PagedResult<ProductResponse>>> GetAll([FromQuery] PaginationQuery paginationQuery)
    {
        var result = await _productService.GetAllAsync(paginationQuery);
        var response = new PagedResult<ProductResponse>
        {
            Items = _mapper.Map<IEnumerable<ProductResponse>>(result.Items),
            TotalCount = result.TotalCount,
            PageNumber = result.PageNumber,
            PageSize = result.PageSize
        };
        return Ok(response);
    }

    /// <summary>
    /// Get product by ID
    /// </summary>
    [HttpGet("{id:int}")]
    public async Task<ActionResult<ProductResponse>> GetById(int id)
    {
        var product = await _productService.GetByIdAsync(id);

        if (product == null)
            return NotFound();

        var response = _mapper.Map<ProductResponse>(product);
        return Ok(response);
    }

    /// <summary>
    /// Get products by category ID
    /// </summary>
    [HttpGet("category/{categoryId:int}")]
    public async Task<ActionResult<IEnumerable<ProductResponse>>> GetByCategory(int categoryId)
    {
        var products = await _productService.GetByCategoryIdAsync(categoryId);
        var response = _mapper.Map<IEnumerable<ProductResponse>>(products);
        return Ok(response);
    }

    /// <summary>
    /// Create a new product
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<ProductResponse>> Create([FromBody] CreateProductRequest request)
    {
        try
        {
            var product = _mapper.Map<Product>(request);
            var createdProduct = await _productService.CreateAsync(product);
            var response = _mapper.Map<ProductResponse>(createdProduct);
            return CreatedAtAction(nameof(GetById), new { id = createdProduct.Id }, response);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    /// <summary>
    /// Update an existing product
    /// </summary>
    [HttpPut("{id:int}")]
    public async Task<ActionResult<ProductResponse>> Update(int id, [FromBody] UpdateProductRequest request)
    {
        if (id != request.Id)
            return BadRequest("ID mismatch");

        try
        {
            var product = _mapper.Map<Product>(request);
            var updatedProduct = await _productService.UpdateAsync(product);
            var response = _mapper.Map<ProductResponse>(updatedProduct);
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
    /// Delete a product
    /// </summary>
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            await _productService.DeleteAsync(id);
            return NoContent();
        }
        catch (InvalidOperationException)
        {
            return NotFound();
        }
    }
}
