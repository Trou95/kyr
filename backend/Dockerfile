FROM mcr.microsoft.com/dotnet/aspnet:8.0-alpine AS base
WORKDIR /app
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080
ENV ASPNETCORE_ENVIRONMENT=Production

FROM mcr.microsoft.com/dotnet/sdk:8.0-alpine AS build
WORKDIR /src

COPY ["src/Kayra.Core/Kayra.Core.csproj", "src/Kayra.Core/"]
COPY ["src/Kayra.Constants/Kayra.Constants.csproj", "src/Kayra.Constants/"]
COPY ["src/Kayra.Entities/Kayra.Entities.csproj", "src/Kayra.Entities/"]
COPY ["src/Kayra.Data/Kayra.Data.csproj", "src/Kayra.Data/"]
COPY ["src/Kayra.Business/Kayra.Business.csproj", "src/Kayra.Business/"]
COPY ["src/Kayra.Api/Kayra.Api.csproj", "src/Kayra.Api/"]

RUN dotnet restore "src/Kayra.Api/Kayra.Api.csproj" --runtime linux-musl-x64

COPY src/ src/

RUN dotnet publish "src/Kayra.Api/Kayra.Api.csproj" \
    -c Release \
    -o /app/publish \
    --runtime linux-musl-x64 \
    --self-contained false \
    --no-restore \
    /p:PublishTrimmed=false \
    /p:PublishSingleFile=false

FROM mcr.microsoft.com/dotnet/sdk:8.0-alpine AS migration
WORKDIR /src
COPY --from=build /src .
RUN dotnet tool install --global dotnet-ef
ENV PATH="$PATH:/root/.dotnet/tools"

FROM base AS final
RUN addgroup -g 1001 -S appgroup && \
    adduser -S appuser -u 1001 -G appgroup
WORKDIR /app
COPY --from=build /app/publish .
COPY --from=migration /root/.dotnet/tools /home/appuser/.dotnet/tools
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh && \
    chown -R appuser:appgroup /app
USER appuser
ENV PATH="$PATH:/home/appuser/.dotnet/tools"
ENTRYPOINT ["sh", "/docker-entrypoint.sh"]