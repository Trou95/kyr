using System.Linq.Expressions;
using Kayra.Core.Pagination;
using Kayra.Entities;
using Microsoft.EntityFrameworkCore;

namespace Kayra.Data.Repositories;

public class ProductRepository : IProductRepository
{
    private readonly AppDbContext _context;

    public ProductRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Product?> GetByIdAsync(int id)
    {
        return await _context.Products
            .Include(p => p.Category)
            .FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task<PagedResult<Product>> GetAllAsync(PaginationQuery paginationQuery)
    {
        return await _context.Products
            .Where(p => p.DeletedAt == null)
            .Include(p => p.Category)
            .ToPagedResultAsync(paginationQuery.PageNumber, paginationQuery.PageSize);
    }

    public async Task<IEnumerable<Product>> FindAsync(Expression<Func<Product, bool>> predicate)
    {
        return await _context.Products
            .Include(p => p.Category)
            .Where(predicate)
            .ToListAsync();
    }

    public async Task<Product> AddAsync(Product entity)
    {
        _context.Products.Add(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task UpdateAsync(Product entity)
    {
        entity.UpdatedAt = DateTime.UtcNow;
        _context.Products.Update(entity);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var product = await GetByIdAsync(id);
        if (product != null)
        {
            product.DeletedAt = DateTime.UtcNow;
            await UpdateAsync(product);
        }
    }

    public async Task<bool> ExistsAsync(int id)
    {
        return await _context.Products.AnyAsync(p => p.Id == id);
    }

    public async Task<IEnumerable<Product>> GetByCategoryIdAsync(int categoryId)
    {
        return await _context.Products
            .Include(p => p.Category)
            .Where(p => p.CategoryId == categoryId && p.DeletedAt == null)
            .ToListAsync();
    }

}
