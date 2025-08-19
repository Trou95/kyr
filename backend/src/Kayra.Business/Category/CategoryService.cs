using Kayra.Core.Pagination;
using Kayra.Data.Repositories;
using Kayra.Entities;

namespace Kayra.Business;

public class CategoryService : ICategoryService
{
    private readonly ICategoryRepository _categoryRepository;

    public CategoryService(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    public async Task<Category?> GetByIdAsync(int id)
    {
        return await _categoryRepository.GetByIdAsync(id);
    }

    public async Task<PagedResult<Category>> GetAllAsync(PaginationQuery paginationQuery)
    {
        return await _categoryRepository.GetAllAsync(paginationQuery);
    }


    public async Task<IEnumerable<Category>> GetActiveCategoriesAsync()
    {
        return await _categoryRepository.GetActiveCategoriesAsync();
    }

    public async Task<Category> CreateAsync(Category category)
    {
        if (category == null)
            throw new ArgumentNullException(nameof(category));

        return await _categoryRepository.AddAsync(category);
    }

    public async Task<Category> UpdateAsync(Category category)
    {
        if (category == null)
            throw new ArgumentNullException(nameof(category));

        var existingCategory = await _categoryRepository.GetByIdAsync(category.Id);
        if (existingCategory == null)
            throw new InvalidOperationException($"Category with ID {category.Id} not found");

        existingCategory.Name = category.Name;
        existingCategory.Description = category.Description;
        existingCategory.IsActive = category.IsActive;
        existingCategory.UpdatedAt = DateTime.UtcNow;

        await _categoryRepository.UpdateAsync(existingCategory);

        return existingCategory;
    }

    public async Task DeleteAsync(int id)
    {
        var exists = await _categoryRepository.ExistsAsync(id);
        if (!exists)
            throw new InvalidOperationException($"Category with ID {id} not found");

        await _categoryRepository.DeleteAsync(id);
    }

    public async Task<bool> ExistsAsync(int id)
    {
        return await _categoryRepository.ExistsAsync(id);
    }
}
