using Crozy.Domain;
using Crozy.Domain.Sellers;
using Crozy.Domain.Users;
using Microsoft.EntityFrameworkCore;

namespace Crozy.Infrastructure.Repositories
{
    public class SellerRepository : BaseRepository, ISellerRepository
    {
        public SellerRepository(CrozyDbContext dbContext) : base(dbContext)
        {
        }

        public Seller Add(Seller seller)
        {
            var addedSeller = dbContext.Add(seller);
            return addedSeller.Entity;
        }

        public async Task<Seller?> GetSellerByExternalIdAsync(long organisationId, string externalUserId,
            CancellationToken cancellationToken = default)
        {
            return await (from seller in dbContext.Sellers
                join user in dbContext.Users on seller.UserId equals user.Id
                where user.ExternalId == externalUserId where seller.OrganisationId == organisationId
                select seller).SingleOrDefaultAsync(cancellationToken); 
        }

        public async Task<Seller?> GetFirstSellerWithExternalIdAsync(string externalId, CancellationToken cancellationToken = default)
        {
            return await (from seller in dbContext.Sellers
                join user in dbContext.Users on seller.UserId equals user.Id
                where user.ExternalId == externalId
                select seller).FirstOrDefaultAsync(cancellationToken);
        }

        public async Task<Seller?> GetSellerInOrganisationByUserIdAsync(long userId, long organisationId,
            CancellationToken cancellationToken = default)
        {
            return await (from seller in dbContext.Sellers
                join user in dbContext.Users on seller.UserId equals user.Id
                where seller.OrganisationId == organisationId 
                where seller.UserId == userId
                select seller).FirstOrDefaultAsync(cancellationToken);
        }

        public void Remove(Seller seller)
        {
            dbContext.Sellers.Remove(seller);
        }

        public async Task<Seller?> GetSellerByIdAsync(long sellerId, CancellationToken cancellationToken = default)
        {
            return await (from seller in dbContext.Sellers
                where seller.Id == sellerId
                select seller).FirstOrDefaultAsync(cancellationToken);
        }

        public async Task<Seller?> GetSellerByInvitationCodeAsync(string invitationCode, CancellationToken cancellationToken = default)
        {
            return await (from seller in dbContext.Sellers
                where seller.Invitation != null && seller.Invitation.InvitationCode == invitationCode
                select seller).SingleOrDefaultAsync(cancellationToken);
        }
        
        public async Task<List<string>> GetAllEmailsForOrganisationAsync(long organisationId, CancellationToken cancellationToken = default)
        {
            return await (from seller in dbContext.Sellers
                where seller.OrganisationId == organisationId
                join user in dbContext.Users.AsNoTracking() on seller.UserId equals user.Id into userJoin
                from user in userJoin.DefaultIfEmpty()
                select new
                {
                    // suppress nullable reference because bug
                    // in DefaultIfEmpty(), it doesn't make user of type User?
                    Email = user != null! ? user.EmailAddress.Email : seller.Invitation!.EmailAddress.Email
                }.Email).ToListAsync(cancellationToken);
        }
        
        public async Task<Seller?> GetOneSellerByUserIdAsync(long userId, CancellationToken cancellationToken = default)
        {
            return await (from seller in dbContext.Sellers
                where seller.UserId == userId
                select seller).FirstOrDefaultAsync(cancellationToken);
        }

    }
}
