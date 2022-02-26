using Microsoft.EntityFrameworkCore;
using TaskContext.Entities;

namespace TaskContext.Context
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }
        public DataContext()
        {
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=LAPTOP-T5ETFQ2L;Database=TaskTwoDB;Trusted_Connection=true;MultipleActiveResultSets=true;");
            }
        }

        //جدول العملاء
        public DbSet<TblCustomers> TblCustomers { get; set; }

    }
}
