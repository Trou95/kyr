namespace Kayra.Core.Entities;

public abstract class BaseEntity<TId>
{
    public required TId Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public DateTime? DeletedAt { get; set; }

    public BaseEntity()
    {
        CreatedAt = DateTime.UtcNow;
    }

}
