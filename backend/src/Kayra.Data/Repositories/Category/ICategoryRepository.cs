using Kayra.Core.Repositories;
using Kayra.Entities;

namespace Kayra.Data.Repositories;

public interface ICategoryRepository : IRepository<Category, int>
{
    Task<IEnumerable<Category>> GetActiveCategoriesAsync();
}
