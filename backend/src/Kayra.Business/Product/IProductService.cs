using Kayra.Core.Pagination;
using Kayra.Entities;

namespace Kayra.Business;

public interface IProductService
{
    Task<Product?> GetByIdAsync(int id);
    Task<PagedResult<Product>> GetAllAsync(PaginationQuery paginationQuery);
    Task<IEnumerable<Product>> GetByCategoryIdAsync(int categoryId);
    Task<Product> CreateAsync(Product product);
    Task<Product> UpdateAsync(Product product);
    Task DeleteAsync(int id);
    Task<bool> ExistsAsync(int id);
}
