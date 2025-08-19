using System.Linq.Expressions;
using Kayra.Core.Pagination;
using Kayra.Entities;
using Microsoft.EntityFrameworkCore;

namespace Kayra.Data.Repositories;

public class CategoryRepository : ICategoryRepository
{
    private readonly AppDbContext _context;

    public CategoryRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Category?> GetByIdAsync(int id)
    {
        Console.WriteLine($"[Repository.GetByIdAsync] Looking for category with ID: {id}");

        var category = await _context.Categories
            .FirstOrDefaultAsync(c => c.Id == id);

        Console.WriteLine($"[Repository.GetByIdAsync] Result: {(category == null ? "NULL" : $"Found: {category.Name}")}");

        return category;
    }

    public async Task<PagedResult<Category>> GetAllAsync(PaginationQuery paginationQuery)
    {
        return await _context.Categories
            .Where(c => c.DeletedAt == null)
            .ToPagedResultAsync(paginationQuery.PageNumber, paginationQuery.PageSize);
    }

    public async Task<IEnumerable<Category>> FindAsync(Expression<Func<Category, bool>> predicate)
    {
        return await _context.Categories
            .Where(predicate)
            .ToListAsync();
    }

    public async Task<Category> AddAsync(Category entity)
    {
        _context.Categories.Add(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task UpdateAsync(Category entity)
    {
        entity.UpdatedAt = DateTime.UtcNow;
        _context.Categories.Update(entity);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var category = await GetByIdAsync(id);
        if (category != null)
        {
            category.DeletedAt = DateTime.UtcNow;
            await UpdateAsync(category);
        }
    }

    public async Task<bool> ExistsAsync(int id)
    {
        return await _context.Categories.AnyAsync(c => c.Id == id);
    }

    public async Task<IEnumerable<Category>> GetActiveCategoriesAsync()
    {
        return await _context.Categories
            .Where(c => c.IsActive && c.DeletedAt == null)
            .ToListAsync();
    }
}
