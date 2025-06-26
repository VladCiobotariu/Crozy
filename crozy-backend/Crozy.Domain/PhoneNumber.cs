namespace Crozy.Domain
{
    public record class PhoneNumber
    {
        public PhoneNumber(string phone)
        {
            if (string.IsNullOrEmpty(phone)) throw new ArgumentException("Phone must be a non empty sting", nameof(phone));
            this.Phone = phone;
        }

        public string Phone { get; private set; }
    }
}
