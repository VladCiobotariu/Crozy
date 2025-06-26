namespace Crozy.Domain.Moneys
{
    public record class Money
    {
        public readonly static Money Zero = new Money(0, Currency.NONE);

        public Money(decimal amount, Currency currency)
        {
            Amount = amount;
            Currency = currency;
        }

        public decimal Amount { get; }
        public Currency Currency { get; }
        public static Money operator +(Money a, Money b)
        {
            if(a == Zero)
            {
                return b;
            }
            if (b == Zero)
            {
                return a;
            }

            if (a.Currency != b.Currency)
            {
                throw new InvalidOperationException("Cannot add amounts with different currencies.");
            }

            return new Money(a.Amount + b.Amount, a.Currency);
        }
        public static Money operator *(Money a, decimal b)
        {
            return new Money(a.Amount * b, a.Currency);
        }
        
        public static Money operator *(decimal a, Money b)
        {
            return new Money(a * b.Amount, b.Currency);
        }
    }
}
