using Crozy.Domain.Orders;
using Crozy.Domain.Payments;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Crozy.Infrastructure.EntityConfigurations
{
    public class PaymentTransactionConfigurations : IEntityTypeConfiguration<PaymentTransaction>
    {
        public void Configure(EntityTypeBuilder<PaymentTransaction> builder)
        {
            builder
                .HasMany(x => x.Results)
                .WithOne()
                .HasForeignKey(x => x.PaymentTransactionId)
                .OnDelete(DeleteBehavior.NoAction);

            builder
                .HasOne<Order>()
                .WithMany()
                .HasForeignKey(x => x.OrderId)
                .OnDelete(DeleteBehavior.NoAction);

            builder.BelongsToOrganisation();
        }
    }
}
