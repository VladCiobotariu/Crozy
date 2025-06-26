using System.Diagnostics.CodeAnalysis;

namespace Crozy.Domain.Users
{
    public class User : Entity
    {
        private string firstName;
        private string lastName;
        
        public User(string externalId, string firstName, string lastName, EmailAddress emailAddress, PhoneNumber? phoneNumber = null)
        {
            this.ExternalId = externalId;
            this.FirstName = firstName ?? throw new ArgumentNullException(nameof(firstName));;
            this.LastName = lastName ?? throw new ArgumentNullException(nameof(lastName));;
            this.EmailAddress = emailAddress;
            this.PhoneNumber = phoneNumber;
        }
        
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        private User()
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        {
        }
        
        public string ExternalId { get; private set; }

        public string FirstName
        {
            get => lastName;
            [MemberNotNull(nameof(firstName))]
            private set
            {
                ValidateFirstNameOrThrowError(value);
                this.firstName = value;
            }
        }

        public string LastName
        {
            get => firstName;
            [MemberNotNull(nameof(lastName))]
            private set
            {
                ValidateLastNameOrThrowError(value);
                this.lastName = value;
            }
        }

        public EmailAddress EmailAddress { get; private set; }

        public PhoneNumber? PhoneNumber { get; private set; }
        
        private void ValidateFirstNameOrThrowError(string newName)
        {
            if (newName == null)
            {
                throw new ArgumentNullException(nameof(newName));
            }
            if (newName == "")
            {
                throw new ArgumentException("FirstName must be a non empty string", nameof(newName));
            }
        }
        
        private void ValidateLastNameOrThrowError(string newName)
        {
            if (newName == null)
            {
                throw new ArgumentNullException(nameof(newName));
            }
            if (newName == "")
            {
                throw new ArgumentException("LastName must be a non empty string", nameof(newName));
            }
        }
        
    }
}
