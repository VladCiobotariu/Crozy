namespace Crozy.Domain.ExtraOptionCategories
{
    public class ExtraOptionCategory : Entity, IOrganisationEntity
    {
        private string name;
        private readonly long organisationId;

        public ExtraOptionCategory(string name, long organisationId)
        {
            this.name = name;
            this.organisationId = organisationId;
        }

        public string Name => name;

        public long OrganisationId => organisationId;

        public void Update(string name)
        {
            this.name = name;
        }
    }
}
