using Crozy.Domain.Orders;
using Crozy.Infrastructure.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Crozy.Domain.Buyers;
using Crozy.Domain.Payments;

namespace Crozy.Infrastructure.EntityConfigurations
{
    public class OrderEntityConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.OwnsOne(x => x.ShippingAddress);
            builder.OwnsOne(x => x.StateDescription);
            var paymentStateBuilder = builder.OwnsOne(x => x.PaymentState);
            paymentStateBuilder
                .HasOne<PaymentTransaction>()
                .WithMany()
                .HasForeignKey(x => x.PaymentTransactionId);
            

            builder.BelongsToOrganisation();

            var customerDetailsbuilder = builder.OwnsOne(x => x.CustomerDetails);
            customerDetailsbuilder.OwnsOne(x => x.PhoneNumber);
            customerDetailsbuilder.OwnsOne(x => x.Email);

            customerDetailsbuilder
                .Property(x => x.FirstName)
                .IsRequired();

            customerDetailsbuilder
                .Property(x => x.LastName)
                .IsRequired();
            
            customerDetailsbuilder.HasOne<Buyer>().WithMany().HasForeignKey(x => x.BuyerId);

            builder.OwnsMoney(x => x.TotalPrice);
            
            builder.HasMany(x => x.Items).WithOne().HasForeignKey(x => x.OrderId);
        }
    }
}
