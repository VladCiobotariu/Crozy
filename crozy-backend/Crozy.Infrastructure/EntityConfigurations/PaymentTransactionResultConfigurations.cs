using Crozy.Domain.Payments;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Crozy.Infrastructure.EntityConfigurations
{
    public class PaymentTransactionResultConfigurations : IEntityTypeConfiguration<PaymentTransactionResult>
    {
        public void Configure(EntityTypeBuilder<PaymentTransactionResult> builder)
        {
            builder.BelongsToOrganisation();
        }
    }
}
