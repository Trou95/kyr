using Kayra.Core.Entities;

namespace Kayra.Entities;

public class Product : BaseEntity<int>
{
    public required string Name { get; set; }
    public string? Description { get; set; }
    public decimal Price { get; set; }
    public int Stock { get; set; }
    public bool IsActive { get; set; } = true;

    public int CategoryId { get; set; }
    public virtual Category Category { get; set; } = null!;
}
