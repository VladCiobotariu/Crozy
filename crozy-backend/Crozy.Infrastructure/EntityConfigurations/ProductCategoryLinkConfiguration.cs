using Crozy.Domain.Products;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Crozy.Infrastructure.EntityConfigurations
{
    public class ProductCategoryLinkConfiguration : IEntityTypeConfiguration<ProductCategoryLink>
    {
        public void Configure(EntityTypeBuilder<ProductCategoryLink> builder)
        {
            builder.HasKey(x=> new {x.ProductId, x.CategoryId});
        }
    }
}
