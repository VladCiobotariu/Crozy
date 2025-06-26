using Crozy.Domain.ExtraOptions;
using Crozy.Domain.Products;
using Crozy.Infrastructure.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Crozy.Infrastructure.EntityConfigurations
{
    internal class ProductEntityConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder
                .HasMany(x => x.CategoryLinks)
                .WithOne();

            builder.OwnsMoney(x => x.Price);

            builder
                .HasMany<ExtraOption>()
                .WithMany()
                .UsingEntity<ProductExtraOptionLink>(
                    l => l.HasOne<ExtraOption>().WithMany().HasForeignKey(x => x.ExtraOptionId),
                    r => r.HasOne<Product>().WithMany(x => x.ExtraOptionLinks).HasForeignKey(x => x.ProductId)
                );

            builder.BelongsToOrganisation();
        }
    }
}
