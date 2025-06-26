using Crozy.Domain;
using Crozy.Domain.Exceptions;
using Crozy.Domain.Orders;

namespace Crozy.GraphQL.Orders
{
    public record class CustomerDetailsInput(string firstName, string lastName, string? email, string? phoneNumber)
    {
        public CustomerDetails ToCustomerDetails(long? buyerId = null) =>
            this switch
            {
                { email: not null, phoneNumber: not null } => new CustomerDetails(firstName, lastName, new EmailAddress(email), new PhoneNumber(phoneNumber), buyerId),
                { email: not null } => new CustomerDetails(firstName, lastName, new EmailAddress(email), buyerId),
                { phoneNumber: not null } => new CustomerDetails(firstName, lastName, new PhoneNumber(phoneNumber), buyerId),
                { email: null, phoneNumber: null } => throw new DomainException($"Phone number or email is required"),
            };
    };
}
