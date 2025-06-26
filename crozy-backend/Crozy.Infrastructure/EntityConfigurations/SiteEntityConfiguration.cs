using Crozy.Domain.Organisations;
using Crozy.Domain.Products;
using Crozy.Domain.Sites;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Crozy.Infrastructure.EntityConfigurations
{
    internal class SiteEntityConfiguration : IEntityTypeConfiguration<Site>
    {
        public void Configure(EntityTypeBuilder<Site> builder)
        {
            builder.HasMany<Product>()
                .WithOne()
                .HasForeignKey(x => x.SiteId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.BelongsToOrganisation();

            builder.OwnsMany(x => x.DeliveryOptions);
        }
    }
}
