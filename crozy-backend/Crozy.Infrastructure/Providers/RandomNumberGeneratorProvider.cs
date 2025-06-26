using Crozy.Domain.Services;

namespace Crozy.Infrastructure.Providers
{
    public  class RandomNumberGeneratorProvider : IRandomNumberGeneratorService
    {
        private Random rnd = new Random();
        
        public RandomNumberGeneratorProvider() { }
        
        public int GenerateRandomNumber()
        {
            return rnd.Next();
        }
    }
}
