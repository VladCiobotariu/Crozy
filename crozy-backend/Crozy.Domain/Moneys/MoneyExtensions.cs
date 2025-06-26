namespace Crozy.Domain.Moneys;

public static class MoneyExtensions
{
    public static Money Sum(this IEnumerable<Money> source, Currency defaultCurrency = Currency.NONE)
    {
        return source.Aggregate(new Money(0, defaultCurrency), (a, b) => a + b);
    }
    
    public static Money Sum<TSource>(this IEnumerable<TSource> source, Func<TSource, Money> selector, Currency defaultCurrency = Currency.NONE)
    {
        return source.Select(selector).Sum(defaultCurrency);
    }
}