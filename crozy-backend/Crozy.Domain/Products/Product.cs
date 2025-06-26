using Crozy.Domain.ExtraOptions;
using System.Diagnostics.CodeAnalysis;
using Crozy.Domain.Moneys;

namespace Crozy.Domain.Products
{
    public class Product : Entity, IOrganisationEntity
    {
        private List<ProductCategoryLink> categoryLinks = new List<ProductCategoryLink>();
        private Money price;
        private string name;
        private string slug;
        private List<ProductExtraOptionLink> extraOptionLinks = [];

        public Product(
            string name, 
            long siteId, 
            Money price, 
            string slug, 
            long organisationId,
            ExtraOption[] extraOptions,
            string? description = "", 
            string? image = "")
        {
            Price = price;
            Name = name;
            SiteId = siteId;
            Slug = slug;
            OrganisationId = organisationId;
            Description = description;
            Image = image;
            extraOptionLinks = extraOptions.Select(x=> new ProductExtraOptionLink(this.Id, x.Id)).ToList();
        }
        
        public long OrganisationId { get; private set; }

        public IReadOnlyCollection<ProductExtraOptionLink> ExtraOptionLinks => extraOptionLinks.AsReadOnly();

        public Money Price
        {
            get => price;
            private set
            {
                ValidatePriceOrThrowError(value);
                price = value;
            }
        }

        public string Name
        {
            get => name;
            [MemberNotNull(nameof(name))]
            private set
            {
                ValidateNameOrThrowError(value);
                name = value;
            }
        }

        public long SiteId { get; private set; }

        public string Slug
        {
            get => slug;
            [MemberNotNull(nameof(slug))]
            private set
            {
                ValidateSlugOrThrowError(value);
                slug = value;
            }
        }

        public string? Description { get; private set; }

        public string? Image { get; private set; }

        public IReadOnlyCollection<ProductCategoryLink> CategoryLinks => categoryLinks.AsReadOnly();

        public void UpdateProduct(
            string name,
            Money price,
            string slug,
            string? description,
            string? image,
            ExtraOption[] extraOptions)
        {
            if (extraOptions.Any(x => x.OrganisationId != this.OrganisationId))
            {
                throw new InvalidOperationException("External Options must belong to same organisation as product");
            }

            Name = name;
            Price = price;
            Slug = slug;
            Description = description;
            Image = image;
            extraOptionLinks = extraOptions.Select(x => new ProductExtraOptionLink(this.Id, x.Id)).ToList();
        }

        // EF Core constructor
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        private Product()
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        {
        }

        public void AddCategory(long categoryId)
        {
            if (categoryId < 0)
            {
                throw new ArgumentException(nameof(categoryId), $"Invalid category ID value {categoryId}");
            }

            categoryLinks.Add(new ProductCategoryLink(Id, categoryId));
        }

        public void ReplaceCategoryLinks(long[] newCategoryIds)
        {
            var newCategoryLinks = newCategoryIds.Select(x => new ProductCategoryLink(Id, x)).ToArray();
            var categoriesToAdd = newCategoryLinks.Where(x => !categoryLinks.Contains(x));
            categoryLinks.RemoveAll(x => !newCategoryLinks.Contains(x));
            categoryLinks.AddRange(categoriesToAdd);
        }

        private void ValidatePriceOrThrowError(Money newPrice)
        {
            if (newPrice.Amount <= 0)
            {
                throw new ArgumentException("Price must be greater than 0", nameof(newPrice));
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
    }
}
