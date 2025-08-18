using Kayra.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Kayra.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

}
