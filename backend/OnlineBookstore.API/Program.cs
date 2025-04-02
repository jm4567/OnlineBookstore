using Microsoft.EntityFrameworkCore;
using OnlineBookstore.API.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<BookstoreDbContext>(options=>
    options.UseSqlite(builder.Configuration.GetConnectionString("BookConnection")));

//build cors policy to allow react app 
builder.Services.AddCors(options => options.AddPolicy("AllowReactApp", 
policy => {

    policy.AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader(); 
})
    
);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReactApp");
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
