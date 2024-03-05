# Utiliza la imagen base de ASP.NET Core en su versión más reciente
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

# Utiliza la imagen base de SDK de .NET en su versión más reciente para compilar la aplicación
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["api.csproj", "./"]
RUN dotnet restore "api.csproj"
COPY . .
WORKDIR "/src"
RUN dotnet build "api.csproj" -c Release -o /app/build

# Publica la aplicación
FROM build AS publish
RUN dotnet publish "api.csproj" -c Release -o /app/publish

# Usa la imagen base de ASP.NET Core en su versión más reciente para ejecutar la aplicación publicada
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "api.dll"]
