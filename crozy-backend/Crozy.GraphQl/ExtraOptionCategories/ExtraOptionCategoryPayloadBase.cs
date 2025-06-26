using Crozy.Domain.ExtraOptionCategories;
using Crozy.GraphQL.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Crozy.GraphQL.ExtraOptionCategories
{
    public class ExtraOptionCategoryPayloadBase : Payload
    {
        protected ExtraOptionCategoryPayloadBase(ExtraOptionCategory? extraOptionCategory)
        {
            ExtraOptionCategory = extraOptionCategory;
        }

        protected ExtraOptionCategoryPayloadBase(IReadOnlyList<UserError> errors)
            : base(errors)
        {
        }

        public ExtraOptionCategory? ExtraOptionCategory { get; }
    }
}
