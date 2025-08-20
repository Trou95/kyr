# ---------- BASE IMAGE ----------
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080
ENV ASPNETCORE_ENVIRONMENT=Production

# ---------- BUILD IMAGE ----------
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY ["src/Kayra.Api/Kayra.Api.csproj", "src/Kayra.Api/"]
COPY ["src/Kayra.Core/Kayra.Core.csproj", "src/Kayra.Core/"]
COPY ["src/Kayra.Constants/Kayra.Constants.csproj", "src/Kayra.Constants/"]
COPY ["src/Kayra.Entities/Kayra.Entities.csproj", "src/Kayra.Entities/"]
COPY ["src/Kayra.Data/Kayra.Data.csproj", "src/Kayra.Data/"]
COPY ["src/Kayra.Business/Kayra.Business.csproj", "src/Kayra.Business/"]

RUN dotnet restore "src/Kayra.Api/Kayra.Api.csproj"
COPY src/ src/
RUN dotnet publish "src/Kayra.Api/Kayra.Api.csproj" -c Release -o /app/publish --self-contained false

# ---------- MIGRATION IMAGE ----------
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS migration
WORKDIR /src
COPY --from=build /src .
RUN dotnet tool install --global dotnet-ef
ENV PATH="$PATH:/root/.dotnet/tools"

# Migration container sadece ef komutu çalıştıracak
# Kullanılacaksa ayrı bir servis veya entrypoint üzerinden çalıştırılabilir

# ---------- FINAL IMAGE ----------
FROM base AS final
RUN addgroup --system --gid 1001 appgroup && \
    adduser --system --uid 1001 --ingroup appgroup appuser

WORKDIR /app
COPY --from=build /app/publish .

COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh && chown -R appuser:appgroup /app
USER appuser

ENTRYPOINT ["sh", "/docker-entrypoint.sh"]
