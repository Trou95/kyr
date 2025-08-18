using System.Linq.Expressions;
using Kayra.Core.Entities;
using Kayra.Core.Pagination;

namespace Kayra.Core.Repositories;

public interface IRepository<TEntity, TId> where TEntity : BaseEntity<TId>
{
    Task<TEntity?> GetByIdAsync(TId id);
    Task<PagedResult<TEntity>> GetAllAsync(PaginationQuery paginationQuery);
    Task<IEnumerable<TEntity>> FindAsync(Expression<Func<TEntity, bool>> predicate);
    Task<TEntity> AddAsync(TEntity entity);
    Task UpdateAsync(TEntity entity);
    Task DeleteAsync(TId id);
    Task<bool> ExistsAsync(TId id);
}
