using Kayra.Core.Pagination;
using Kayra.Data.Repositories;
using Kayra.Entities;

namespace Kayra.Business;

public class ProductService : IProductService
{
    private readonly IProductRepository _productRepository;

    public ProductService(IProductRepository productRepository)
    {
        _productRepository = productRepository;
    }

    public async Task<Product?> GetByIdAsync(int id)
    {
        return await _productRepository.GetByIdAsync(id);
    }

    public async Task<PagedResult<Product>> GetAllAsync(PaginationQuery paginationQuery)
    {
        return await _productRepository.GetAllAsync(paginationQuery);
    }

    public async Task<IEnumerable<Product>> GetByCategoryIdAsync(int categoryId)
    {
        return await _productRepository.GetByCategoryIdAsync(categoryId);
    }


    public async Task<Product> CreateAsync(Product product)
    {
        if (product == null)
            throw new ArgumentNullException(nameof(product));

        return await _productRepository.AddAsync(product);
    }

    public async Task<Product> UpdateAsync(Product product)
    {
        if (product == null)
            throw new ArgumentNullException(nameof(product));

        var existingProduct = await _productRepository.GetByIdAsync(product.Id);
        if (existingProduct == null)
            throw new InvalidOperationException($"Product with ID {product.Id} not found");

        await _productRepository.UpdateAsync(product);
        return product;
    }

    public async Task DeleteAsync(int id)
    {
        var exists = await _productRepository.ExistsAsync(id);
        if (!exists)
            throw new InvalidOperationException($"Product with ID {id} not found");

        await _productRepository.DeleteAsync(id);
    }

    public async Task<bool> ExistsAsync(int id)
    {
        return await _productRepository.ExistsAsync(id);
    }
}
