using Kayra.Core.Entities;

namespace Kayra.Entities;

public class Category : BaseEntity<int>
{
    public required string Name { get; set; }
    public string? Description { get; set; }
    public bool IsActive { get; set; } = true;

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}
