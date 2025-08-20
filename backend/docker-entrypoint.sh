#!/bin/sh
echo "Applying migrations..."
# Migration'ları çalıştır
dotnet tool install --global dotnet-ef || true
export PATH="$PATH:/root/.dotnet/tools"
dotnet ef database update -p Kayra.Api/Kayra.Api.csproj -s Kayra.Api/Kayra.Api.csproj

echo "Starting Kayra.Api..."
exec dotnet Kayra.Api.dll
