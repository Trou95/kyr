using Kayra.Core.Pagination;
using Microsoft.EntityFrameworkCore;

public static class IQueryableExtensions
{
    public static async Task<PagedResult<T>> ToPagedResultAsync<T>(
        this IQueryable<T> query,
        int pageNumber,
        int pageSize,
        CancellationToken cancellationToken = default)
        where T : class
    {
        var result = new PagedResult<T>();
        result.PageNumber = pageNumber;
        result.PageSize = pageSize;
        result.TotalCount = await query.CountAsync(cancellationToken);
        result.Items = await query.Skip((pageNumber - 1) * pageSize)
                                  .Take(pageSize)
                                  .ToListAsync(cancellationToken);
        return result;
    }
}
