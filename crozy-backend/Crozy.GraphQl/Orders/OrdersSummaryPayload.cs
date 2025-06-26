using Crozy.GraphQL.Common;
using Microsoft.EntityFrameworkCore.Query.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Crozy.GraphQL.Orders
{
    public class OrdersSummaryPayload : Payload
    {
        public OrdersSummaryPayload(int newOrders, int processingOrders)
        {
            this.NewOrders = newOrders;
            this.ProcessingOrders = processingOrders;
        }
        public OrdersSummaryPayload(IReadOnlyList<UserError> errors) : base(errors)
        {
        }

        public int NewOrders { get; init; }

        public int ProcessingOrders { get; init; }
    }
}
