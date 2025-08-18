namespace Kayra.Api.Dtos.Category;

/// <summary>
/// Request model for updating an existing category
/// </summary>
public class UpdateCategoryRequest
{
    /// <summary>
    /// Category ID
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Category name
    /// </summary>
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Category description
    /// </summary>
    public string? Description { get; set; }


    /// <summary>
    /// Is category active
    /// </summary>
    public bool IsActive { get; set; }
}
