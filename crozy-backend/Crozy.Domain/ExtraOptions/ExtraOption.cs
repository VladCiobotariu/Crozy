using Crozy.Domain.Moneys;

namespace Crozy.Domain.ExtraOptions
{
    public class ExtraOption : Entity, IOrganisationEntity
    {
        private readonly long organisationId;
        
        private string name;
        private Money price;        
        private long extraOptionCategoryId;

        public ExtraOption(string name, Money price, long organisationId, long extraOptionCategoryId)
        {
            this.name = name;
            this.price = price;
            this.organisationId = organisationId;
            this.extraOptionCategoryId = extraOptionCategoryId;
        }

        // EF Core constructor
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        private ExtraOption()
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        {
        }

        public string Name => name;

        public Money Price => price;

        public long OrganisationId => organisationId;

        public long ExtraOptionCategoryId => extraOptionCategoryId;

        public void Update(string name, Money price, long extraOptionCategoryId)
        {
            this.name = name;
            this.price = price;
            this.extraOptionCategoryId = extraOptionCategoryId;
        }
    }
}
