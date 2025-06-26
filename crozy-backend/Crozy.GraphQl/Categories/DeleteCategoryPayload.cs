using Crozy.GraphQL.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Crozy.GraphQL.Categories
{
    public class DeleteCategoryPayload : Payload
    {
        public DeleteCategoryPayload(bool deleted) 
        {
            Deleted = deleted;
        }

        public DeleteCategoryPayload(IReadOnlyList<UserError> errors) : base(errors) { }

        public bool Deleted { get; }
    }
}
