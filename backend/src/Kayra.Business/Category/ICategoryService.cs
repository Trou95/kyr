using Kayra.Core.Pagination;
using Kayra.Entities;

namespace Kayra.Business;

public interface ICategoryService
{
    Task<Category?> GetByIdAsync(int id);
    Task<PagedResult<Category>> GetAllAsync(PaginationQuery paginationQuery);
    Task<IEnumerable<Category>> GetActiveCategoriesAsync();
    Task<Category> CreateAsync(Category category);
    Task<Category> UpdateAsync(Category category);
    Task DeleteAsync(int id);
    Task<bool> ExistsAsync(int id);
}
