namespace Crozy.Domain
{
    public record class EmailAddress
    {
        public EmailAddress(string email)
        {
            if (string.IsNullOrEmpty(email)) throw new ArgumentException("email must be a non empty string", nameof(email));

            this.Email = email;
        }

        public string Email { get; private set; }
    }
}
