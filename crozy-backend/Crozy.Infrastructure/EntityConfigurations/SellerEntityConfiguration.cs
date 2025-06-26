using Crozy.Domain.Users;
using Crozy.Domain.Organisations;
using Crozy.Domain.Sellers;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Crozy.Infrastructure.EntityConfigurations
{
    public class SellerEntityConfiguration : IEntityTypeConfiguration<Seller>
    {
        public void Configure(EntityTypeBuilder<Seller> builder)
        {
            var invitationBuilder = builder.OwnsOne(x => x.Invitation);
            invitationBuilder.OwnsOne(x => x.EmailAddress);
            invitationBuilder
                .HasIndex(x => x.InvitationCode)
                .IsUnique();

            builder.BelongsToOrganisation();

            builder
                .HasOne<User>()
                .WithMany()
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.Cascade);
            
            builder
                .HasIndex(x => new {x.UserId, x.OrganisationId})
                .IsUnique();
        }
    }
}
