using Crozy.Domain.Sellers;
using Crozy.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Crozy.GraphQL.Types;

public class InvitationType : ObjectType<Invitation>
{
    protected override void Configure(IObjectTypeDescriptor<Invitation> descriptor)
    {
        descriptor.Ignore(x => x.EmailAddress);
        descriptor
            .Field("Email")
            .Resolve(x => 
                x.Parent<Invitation>().EmailAddress.Email)
            .Name("email");
    }
}