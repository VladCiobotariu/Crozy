using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace Crozy.Domain.Sites
{
    public class Site : Entity, IOrganisationEntity
    {
        private readonly List<Address> deliveryOptions = new List<Address>();
        private string name;
        private string slug;

        public Site(string name, string slug, long organisationId)
        {
            Name = name;
            Slug = slug;
            OrganisationId = organisationId;
        }

        public long OrganisationId { get; private set; }

        [Required]
        [StringLength(256)]
        public string Name
        {
            get => name;
            [MemberNotNull(nameof(name))]
            set
            {
                ValidateNameOrThrowError(value);
                name = value;
            }
        }

        [Required]
        [StringLength(128)]
        public string Slug
        {
            get => slug;
            [MemberNotNull(nameof(slug))]
            set
            {
                ValidateSlugOrThrowError(value);
                slug = value;
            }
        }

        private void ValidateNameOrThrowError(string newName)
        {
            if (newName == null)
            {
                throw new ArgumentNullException(nameof(newName));
            }
            if (newName == "")
            {
                throw new ArgumentException("Name must be a non empty string", nameof(newName));
            }
        }

        private void ValidateSlugOrThrowError(string newSlug)
        {
            if (newSlug == null)
            {
                throw new ArgumentNullException(nameof(newSlug));
            }
            if (newSlug == "")
            {
                throw new ArgumentException("Slug must be a non empty string", nameof(newSlug));
            }
        }

        public bool OnlyPredeffinedDeliveryOptions { get; private set; }

        public IReadOnlyList<Address> DeliveryOptions => deliveryOptions;

        public void SetPredefinedDeliveryOptionsOnly(IEnumerable<Address> deliveryOptions)
        {
            OnlyPredeffinedDeliveryOptions = true;
            this.deliveryOptions.Clear();
            this.deliveryOptions.AddRange(deliveryOptions);
        }

        public void AddDeliveryOption(Address address)
        {
            deliveryOptions.Add(address);
        }
    }
}
