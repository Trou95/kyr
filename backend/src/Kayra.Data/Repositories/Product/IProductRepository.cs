using Kayra.Core.Repositories;
using Kayra.Entities;

namespace Kayra.Data.Repositories;

public interface IProductRepository : IRepository<Product, int>
{
    Task<IEnumerable<Product>> GetByCategoryIdAsync(int categoryId);

}
