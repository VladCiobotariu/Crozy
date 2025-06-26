using Crozy.Domain.Users;

namespace Crozy.Domain.Buyers;

public class BuyerService
{
    private readonly IBuyerRepository buyerRepository;
    private readonly IUserRepository userRepository;

    public BuyerService(IBuyerRepository buyerRepository, IUserRepository userRepository)
    {
        this.buyerRepository = buyerRepository;
        this.userRepository = userRepository;
    }

    public async Task<Buyer> AddBuyerIfNotExistingWithExternalId(string externalId, EmailAddress email, string firstName, string lastName)
    {
        Buyer addedBuyer;
        
        var buyer = await buyerRepository.GetBuyerByExternalIdAsync(externalId);
        if (buyer is not null) return buyer;
        
        var user = await userRepository.GetUserByExternalIdAsync(externalId);
        if (user is not null)
        {
            addedBuyer = buyerRepository.Add(new Buyer(user.Id));
            await buyerRepository.SaveChangesAsync();
            return addedBuyer;
        }

        var addedUser = userRepository.Add(new User(externalId, firstName, lastName, email));
        await userRepository.SaveChangesAsync();
        
        addedBuyer = buyerRepository.Add(new Buyer(addedUser.Id));
        await buyerRepository.SaveChangesAsync();

        return addedBuyer;
    }
}