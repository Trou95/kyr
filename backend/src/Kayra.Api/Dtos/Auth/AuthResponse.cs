namespace Kayra.Api.Dtos.Auth;

/// <summary>
/// Authentication response model
/// </summary>
public class AuthResponse
{
    /// <summary>
    /// JWT token
    /// </summary>
    public string Token { get; set; } = string.Empty;

    /// <summary>
    /// Token expiration time
    /// </summary>
    public DateTime ExpiresAt { get; set; }

    /// <summary>
    /// User ID
    /// </summary>
    public int UserId { get; set; }

    /// <summary>
    /// Username
    /// </summary>
    public string Username { get; set; } = string.Empty;
}