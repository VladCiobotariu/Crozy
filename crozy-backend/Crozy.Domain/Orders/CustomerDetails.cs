namespace Crozy.Domain.Orders
{
    public record class CustomerDetails
    {
        public CustomerDetails(string firstName, string lastName, PhoneNumber phoneNumber, long? buyerId = null)
        {
            BuyerId = buyerId;
            FirstName = firstName;
            LastName = lastName;
            PhoneNumber = phoneNumber;
        }

        public CustomerDetails(string firstName, string lastName, EmailAddress email, long? buyerId = null)
        {
            FirstName = firstName;
            LastName = lastName;
            BuyerId = buyerId;
            Email = email;
        }

        public CustomerDetails(string firstName, string lastName, EmailAddress email, PhoneNumber phoneNumber, long? buyerId = null)
        {
            FirstName = firstName;
            LastName = lastName;
            BuyerId = buyerId;
            Email = email ?? throw new ArgumentNullException(nameof(email));
            PhoneNumber = phoneNumber ?? throw new ArgumentNullException(nameof(phoneNumber));
        }

#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        private CustomerDetails()
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        {
        }
        
        public string FullName => $"{FirstName} {LastName}";
        
        public long? BuyerId { get; private set; }
        public string FirstName { get; }
        public string LastName { get; }
        public PhoneNumber? PhoneNumber { get; private set; }
        public EmailAddress? Email { get; private set; }
    }
}
