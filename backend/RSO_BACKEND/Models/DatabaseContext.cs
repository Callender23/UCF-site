using Microsoft.EntityFrameworkCore;

namespace RSO_TEST_API.Models
{
    public class DatabaseContext: DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options):base(options)
        {
            
        }
        
        public DbSet<User> Users { get; set; }
        public DbSet<RSO> RSOs { get; set; }
    }
}