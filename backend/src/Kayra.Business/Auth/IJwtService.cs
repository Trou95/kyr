using Kayra.Entities;

namespace Kayra.Business.Auth;

public interface IJwtService
{
    string GenerateToken(User user);
}