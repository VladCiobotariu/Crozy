using Crozy.Domain.Users;
using Crozy.Domain.Orders;
using HotChocolate.Types;

namespace Crozy.GraphQL.Types
{
    public class CustomerDetailsType : ObjectType<CustomerDetails>
    {
        protected override void Configure(IObjectTypeDescriptor<CustomerDetails> descriptor)
        {
            descriptor
                .Field(x => x.Email)
                .Resolve(x => x.Parent<CustomerDetails>()?.Email?.Email)
                .Type<StringType>()
                .Name("email");

            descriptor
                .Field(x => x.PhoneNumber)
                .Resolve(x => x.Parent<CustomerDetails>()?.PhoneNumber?.Phone)
                .Type<StringType>()
                .Name("phoneNumber");
            
            descriptor.Field(x => x.BuyerId).ID(nameof(User));
        }
    }
}
