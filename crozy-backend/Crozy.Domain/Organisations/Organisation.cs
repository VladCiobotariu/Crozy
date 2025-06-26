namespace Crozy.Domain.Organisations
{
    public class Organisation : Entity
    {
        public Organisation(string name)
        {
            Name = name;
        }

        public string Name { get; private set; }
    }
}
