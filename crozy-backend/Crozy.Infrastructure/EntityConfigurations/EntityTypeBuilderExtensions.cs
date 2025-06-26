using Crozy.Domain;
using Crozy.Domain.Moneys;
using Crozy.Domain.Organisations;
using Crozy.Infrastructure.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Linq.Expressions;

namespace Crozy.Infrastructure.EntityConfigurations
{
    public static class EntityTypeBuilderExtensions
    {
        public static EntityTypeBuilder<TEntity> BelongsToOrganisation<TEntity>(this EntityTypeBuilder<TEntity> builder) 
            where TEntity : class, IOrganisationEntity
        {
            builder
                .HasOne<Organisation>()
                .WithMany()
                .HasForeignKey(x => x.OrganisationId)
                .OnDelete(DeleteBehavior.NoAction)
                ;

            return builder;
        }

        public static OwnedNavigationBuilder<TEntity, Money> OwnsMoney<TEntity>(
            this EntityTypeBuilder<TEntity> builder, 
            Expression<Func<TEntity, Money?>> navigationExpression)
            where TEntity : class
        {
            var moneyBuilder = builder.OwnsOne(navigationExpression);
            moneyBuilder.OwnsMoney();

            return moneyBuilder;
        }

        public static OwnedNavigationBuilder<TDependentEntity, Money> OwnsMoney<TOwnerEntity, TDependentEntity>(
            this OwnedNavigationBuilder<TOwnerEntity, TDependentEntity> builder,
            Expression<Func<TDependentEntity, Money?>> navigationExpression)
            where TOwnerEntity : class
            where TDependentEntity : class
        {
            var moneyBuilder = builder.OwnsOne(navigationExpression);
            moneyBuilder.OwnsMoney();

            return moneyBuilder;
        }

        public static OwnedNavigationBuilder<TOwnerEntity, Money> OwnsMoney<TOwnerEntity>(
            this OwnedNavigationBuilder<TOwnerEntity, Money> builder)
            where TOwnerEntity : class
        {
            builder
                .Property(x => x.Currency)
                .IsRequired()
                .HasConversion<string>();

            builder
                .Property(x => x.Amount)
                .IsRequired()
                .HasCurrencyPrecision();

            return builder;
        }
    }
}
