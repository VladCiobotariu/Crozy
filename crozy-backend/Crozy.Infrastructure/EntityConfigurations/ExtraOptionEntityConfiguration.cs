using Crozy.Domain.ExtraOptionCategories;
using Crozy.Domain.ExtraOptions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Crozy.Infrastructure.EntityConfigurations
{
    public class ExtraOptionEntityConfiguration : IEntityTypeConfiguration<ExtraOption>
    {
        public void Configure(EntityTypeBuilder<ExtraOption> builder)
        {

            builder.Property(x => x.Name).IsRequired();

            builder.BelongsToOrganisation();

            builder.OwnsMoney(x => x.Price);

            builder
                .HasOne<ExtraOptionCategory>()
                .WithMany()
                .HasForeignKey(x => x.ExtraOptionCategoryId)
                .IsRequired();
        }
    }
}
