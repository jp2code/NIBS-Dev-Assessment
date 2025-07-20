using Microsoft.EntityFrameworkCore;
using NibsReactApp1.Server.Models;

namespace NibsReactApp1.Server;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<NIBS> NIBS { get; set; }

}
