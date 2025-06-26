namespace Crozy.Domain.Buyers;

public class Buyer : Entity
{
    
    public long UserId { get; private set; }

    public Buyer(long userId)
    {
        UserId = userId;
    }
}