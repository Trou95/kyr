using FluentValidation;
using FluentValidation.AspNetCore;
using Kayra.Api.Extensions;
using Kayra.Constants;
using Kayra.Data;
using Kayra.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Versioning;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString(ConnectionStrings.DefaultConnection)));

// Identity
builder.Services.AddIdentity<User, IdentityRole<int>>(options =>
{
    options.User.RequireUniqueEmail = true;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
})
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders();

// Register repositories and services
builder.Services.AddRepositories();
builder.Services.AddBusinessServices();

builder.Services.AddApiVersioning(options =>
{

    options.DefaultApiVersion = new ApiVersion(1, 0);
    options.AssumeDefaultVersionWhenUnspecified = true;

    options.ApiVersionReader = ApiVersionReader.Combine(
        new UrlSegmentApiVersionReader()
    );
});

builder.Services.AddVersionedApiExplorer(options =>
{
    options.GroupNameFormat = builder.Configuration[ConfigKeys.ApiVersioningGroupNameFormat]!;
    options.SubstituteApiVersionInUrl = true;
});

builder.Services.AddAutoMapper(typeof(Program));

builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddValidatorsFromAssemblyContaining<Program>();

builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
         Encoding.UTF8.GetBytes(builder.Configuration[JwtConstants.Key]!))
        };


    });

builder.Services.AddAuthorization();

builder.Services.AddProblemDetails();

builder.Services.AddCors(options =>
{
    var policyName = builder.Configuration[ConfigKeys.CorsPolicyName]!;
    var allowedOrigins = builder.Configuration.GetSection(ConfigKeys.CorsAllowedOrigins).Get<string[]>()!;

    options.AddPolicy(policyName, policy =>
    {
        policy.WithOrigins(allowedOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});



var app = builder.Build();

// Run database migrations on startup
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    context.Database.Migrate();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseExceptionHandler();
    app.UseHsts();
}

// app.UseHttpsRedirection(); // Disabled for Docker development

app.UseCors(builder.Configuration[ConfigKeys.CorsPolicyName]!);

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
