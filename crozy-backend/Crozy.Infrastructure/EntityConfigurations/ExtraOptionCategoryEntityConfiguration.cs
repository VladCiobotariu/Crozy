using Crozy.Domain.ExtraOptionCategories;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Crozy.Infrastructure.EntityConfigurations
{
    public class ExtraOptionCategoryEntityConfiguration : IEntityTypeConfiguration<ExtraOptionCategory>
    {
        public void Configure(EntityTypeBuilder<ExtraOptionCategory> builder)
        {
            builder.Property(x => x.Name)
                .IsRequired();

            builder.BelongsToOrganisation();
        }
    }
}
