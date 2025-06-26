namespace Crozy.Domain.Sellers
{
    public interface ISellerRepository
    {
        Seller Add(Seller seller);
        Task<Seller?> GetSellerByExternalIdAsync(long organisationId, string externalUserId, CancellationToken cancellationToken = default);
        Task<Seller?> GetFirstSellerWithExternalIdAsync(string externalId, CancellationToken cancellationToken = default);
        Task<List<string>> GetAllEmailsForOrganisationAsync(long organisationId, CancellationToken cancellationToken = default);
        Task<Seller?> GetSellerInOrganisationByUserIdAsync(long userId, long organisationId, CancellationToken cancellationToken = default);
        Task<Seller?> GetSellerByIdAsync(long sellerId, CancellationToken cancellationToken = default);
        Task<Seller?> GetSellerByInvitationCodeAsync(string invitationCode, CancellationToken cancellationToken = default);
        void Remove(Seller seller);
        Task SaveChangesAsync(CancellationToken cancellationToken = default);
        Task<Seller?> GetOneSellerByUserIdAsync(long userId, CancellationToken cancellationToken = default);
    }
}
