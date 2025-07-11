using Form_Backend.Models;
using Form_Backend.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policyBuilder =>
    {
        policyBuilder.WithOrigins("http://localhost:5173");
        policyBuilder.AllowAnyHeader();
        policyBuilder.AllowAnyMethod();
        policyBuilder.AllowCredentials();
    });
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.Configure<FormDatabaseSetting>(
    builder.Configuration.GetSection("FormDatabase"));
builder.Services.AddSingleton<FormServices>();

builder.Services.Configure<WebhostingSettting>(
    builder.Configuration.GetSection("Hosting"));

builder.Services.Configure<UserModelDatabaseSetting>(
    builder.Configuration.GetSection("FormDatabase"));  
builder.Services.AddSingleton<UserServices>();


builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme; 
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = false;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        RequireExpirationTime = true,
       
        ValidateIssuerSigningKey = true,
        //Might cause issue

        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration.GetSection("JwtKey").Value??"")),
        //IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("CA852B728DD3445F17FAFA38725BCSDSDFSDFSD")),
        ValidateLifetime = true,
        ClockSkew = TimeSpan.FromDays(10),

        ValidateIssuer = false,
        ValidateAudience = false
    };
})
;
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.UseCors("Frontend");

app.Run();
