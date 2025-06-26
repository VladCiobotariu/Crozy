using Crozy.Domain.Users;
using Crozy.Domain.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using System.Data.Common;
using System.Data;
using Crozy.Domain.Buyers;
using Crozy.Domain.Categories;
using Crozy.Domain.Sites;
using Crozy.Domain.Products;
using Crozy.Domain.Orders;
using Crozy.Domain.Organisations;
using Crozy.Domain.Sellers;
using Crozy.Domain.Payments;
using Crozy.Domain.ExtraOptionCategories;
using Crozy.Domain.ExtraOptions;

namespace Crozy.Infrastructure
{
    public class CrozyDbContext : DbContext, IOrderNumberProvider
    {
        public static class Sequences
        {
            public const string OrderNumbers = "OrderNumbers";
        }

        public CrozyDbContext(DbContextOptions<CrozyDbContext> options) : base(options)
        {

        }
        public DbSet<Order> Orders { get; set; } = default!;

        public DbSet<OrderItem> OrderItems { get; set; } = default!;

        public DbSet<OrderItemExtraOption> OrderItemExtraOptions { get; set; } = default!;

        public DbSet<Product> Products { get; set; } = default!;

        public DbSet<ProductExtraOptionLink> ProductExtraOptionLinks { get; set; } = default!;

        public DbSet<Category> Categories { get; set; } = default!;

        public DbSet<Site> Sites { get; set; } = default!;
        
        public DbSet<User> Users { get; set; } = default!;

        public DbSet<Organisation> Organisations { get; set; } = default!;

        public DbSet<Seller> Sellers { get; set; } = default!;
        
        public DbSet<Buyer> Buyers { get; set; } = default!;

        public DbSet<PaymentTransaction> PaymentTransactions { get; set; } = default!;

        public DbSet<PaymentTransactionResult> PaymentTransactionResults { get; set; } = default!;

        public DbSet<ProductCategoryLink> ProductCategories { get; set; } = default!;

        public DbSet<ExtraOptionCategory> ExtraOptionCategories { get; set; } =default!;

        public DbSet<ExtraOption> ExtraOptions { get; set; } = default!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.HasSequence<int>(Sequences.OrderNumbers)
                .StartsAt(1);

            modelBuilder.ApplyConfigurationsFromAssembly(typeof(CrozyDbContext).Assembly);
        }

        protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
        {
            configurationBuilder
                .Properties<DateTimeOffset>()
                .HaveConversion<DateTimeOffsetConverter>();
        }

        public string GetNextOrderNumber()
        {
            long? nextId = Database.SqlQueryRaw<long>($"SELECT NEXTVAL('\"{Sequences.OrderNumbers}\"')").ToList().FirstOrDefault();
            if(nextId is not null)
            {
                string orderNo = $"ON-{nextId:D6}";
                return orderNo;
            }
            throw new InvalidOperationException("Generated sequence is not a valid number");
        }

        private object? ExecuteScalar(DatabaseFacade database,
        string sql, List<DbParameter>? parameters = null,
        CommandType commandType = CommandType.Text,
        int? commandTimeOutInSeconds = null)
        {
            using (var cmd = database.GetDbConnection().CreateCommand())
            {
                if (cmd.Connection != null && cmd.Connection.State != ConnectionState.Open)
                {
                    cmd.Connection.Open();
                }
                cmd.CommandText = sql;
                cmd.CommandType = commandType;
                if (commandTimeOutInSeconds != null)
                {
                    cmd.CommandTimeout = (int)commandTimeOutInSeconds;
                }
                if (parameters != null)
                {
                    cmd.Parameters.AddRange(parameters.ToArray());
                }
                var value = cmd.ExecuteScalar();
                return value;
            }
        }
    }
}