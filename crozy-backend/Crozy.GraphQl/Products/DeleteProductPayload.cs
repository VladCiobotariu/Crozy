using Crozy.GraphQL.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Crozy.GraphQL.Products
{
    public class DeleteProductPayload : Payload
    {
        public DeleteProductPayload(bool deleted)
        {
            Deleted = deleted;
        }

        public DeleteProductPayload(IReadOnlyList<UserError> errors) : base(errors) { } 
        public bool Deleted { get; }
    }
}
