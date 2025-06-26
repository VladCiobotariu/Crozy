using Crozy.Domain.Services;

namespace Crozy.Infrastructure.Providers
{
    public class InMemoryOrderNumberProvider : IOrderNumberProvider
    {
        private static int counter = 0;
        public string GetNextOrderNumber() => $"ON-{++counter:D6}";
    }
}
