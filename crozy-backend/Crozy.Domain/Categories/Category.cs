using System.Diagnostics.CodeAnalysis;

namespace Crozy.Domain.Categories
{
    public class Category : Entity, IOrganisationEntity
    {
        private string name;
        private string slug;
        private int displayNumber;

        public long OrganisationId { get; private set; }

        public Category(
            string name, 
            string slug, 
            long organisationId,
            int displayNumber,
            string? description = null)
        {
            Name = name;
            Slug = slug;
            OrganisationId = organisationId;
            this.displayNumber = displayNumber;
            Description = description;
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

        public int DisplayNumber => displayNumber;

        public void UpdateCategory(string newName, string newSlug, string? newDescription, int newDisplayNumber)
        {
            name = newName;
            slug = newSlug;
            Description = newDescription;
            displayNumber = newDisplayNumber;
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
