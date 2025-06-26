using Crozy.Domain.Organisations;
using Crozy.Domain.Sellers;
using Crozy.Domain.Users;

namespace Crozy.Domain.Sellers;

public class SellerService
{
    private readonly ISellerRepository sellerRepository;
    private readonly IUserRepository userRepository;
    private readonly IOrganisationRepository organisationRepository;

    public SellerService(ISellerRepository sellerRepository, IUserRepository userRepository, IOrganisationRepository organisationRepository)
    {
        this.sellerRepository = sellerRepository;
        this.userRepository = userRepository;
        this.organisationRepository = organisationRepository;
    }

    public async Task<Seller> AddSellerIfNotExistingWithExternalIdAsync(string externalId, string email, string firstName, string lastName, CancellationToken cancellationToken)
    {
        var user = await userRepository.GetUserByExternalIdAsync(externalId, cancellationToken);
        if (user is null)
        {
            user = userRepository.Add(new User(externalId, firstName, lastName, new EmailAddress(email)));
            await userRepository.SaveChangesAsync(cancellationToken);
        }

        var seller = await sellerRepository.GetOneSellerByUserIdAsync(user.Id, cancellationToken);
        if (seller is null)
        {
            var organisation = await CreateAndSaveNewOrganisation(cancellationToken);
            seller = sellerRepository.Add(Seller.CreateSellerOwner(organisation.Id, user.Id));
            await sellerRepository.SaveChangesAsync(cancellationToken);
        }

        return seller;
    }

    private async Task<Organisation> CreateAndSaveNewOrganisation(CancellationToken cancellationToken)
    {
        var newOrgName = GenerateRandomOrgName();
        var newOrg = new Organisation(newOrgName);
        organisationRepository.Add(newOrg);
        await organisationRepository.SaveChangesAsync(cancellationToken);
        return newOrg;
    }
    
    private string GenerateRandomOrgName()
    {
        // TODO - this will be deleted, its only to generate a random organisation name until a custom sign in page is created
        const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        var random = new Random();
        return new string(Enumerable.Repeat(chars, 10)
            .Select(s => s[random.Next(s.Length)]).ToArray());
    }
}