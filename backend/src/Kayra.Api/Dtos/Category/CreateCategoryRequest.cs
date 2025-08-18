namespace Kayra.Api.Dtos.Category;

/// <summary>
/// Request model for creating a new category
/// </summary>
public class CreateCategoryRequest
{
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
    public bool IsActive { get; set; } = true;
}
