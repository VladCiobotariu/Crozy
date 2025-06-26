namespace Crozy.Domain
{
    public record class Address
    {
        public Address(string country, string region, string city, string line1, string? line2 = null, string? displayName = null)
        {
            this.Country = country;
            this.Region = region;
            this.City = city;
            this.Line1 = line1;
            this.Line2 = line2;
            this.DisplayName = displayName;
        }

        public string Country { get; private set; }
        public string Region { get; private set; }
        public string City { get; private set; }
        public string Line1 { get; private set; }
        public string? Line2 { get; private set; }
        public string? DisplayName { get; private set; }
    }
}
