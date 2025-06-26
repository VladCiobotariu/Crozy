using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Crozy.Infrastructure.Extensions
{
    public static class PropertyBuilderExtensions
    {
        public static PropertyBuilder<decimal> HasCurrencyPrecision(this PropertyBuilder<decimal> builder)
        {
            return builder.HasPrecision(14, 2);
        }
    }
}
