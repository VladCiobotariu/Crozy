using Crozy.Domain.ExtraOptions;
using Crozy.Domain.Orders;
using Crozy.Domain.Products;
using Crozy.Infrastructure.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Crozy.Infrastructure.EntityConfigurations
{
    public class OrderItemEntityConfiguration : IEntityTypeConfiguration<OrderItem>
    {
        public void Configure(EntityTypeBuilder<OrderItem> builder)
        {
            builder
                .HasOne<Product>()
                .WithMany()
                .HasForeignKey(x => x.ProductId)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.SetNull)
                ;

            builder.OwnsMoney(x => x.ProductPrice);

            builder.OwnsMoney(x => x.OrderItemTotalPrice);

            builder.Property(x => x.Quantity)
                .HasPrecision(14, 5);

            var extraOptionsBuilder = builder
                .OwnsMany(x => x.ExtraOptions, od =>
                {
                    od
                    .HasOne<ExtraOption>()
                    .WithMany()
                    .HasForeignKey(x => x.ExtraOptionId);

                    od.OwnsMoney(x => x.Price);
                    od.Property(x => x.Name).IsRequired();
                });


            builder.BelongsToOrganisation();
        }
    }
}
