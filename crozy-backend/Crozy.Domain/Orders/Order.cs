using Crozy.Domain.Exceptions;
using Crozy.Domain.ExtraOptions;
using Crozy.Domain.Moneys;
using Crozy.Domain.Products;

namespace Crozy.Domain.Orders
{
    public class Order : Entity, IOrganisationEntity
    {
        private readonly List<OrderItem> items = new List<OrderItem>();

        public Order(
            string number,
            long siteId,
            long organisationId,
            Address shippingAddress,
            CustomerDetails customerDetails,
            PaymentType paymentType,
            string? customerNotes = null)
        {
            Number = number;
            SiteId = siteId;
            OrganisationId = organisationId;
            StateDescription = new OrderStateDescription(OrderState.Draft);
            ShippingAddress = shippingAddress;
            CustomerDetails = customerDetails;
            CustomerNotes = customerNotes;
            OrderDateTime = DateTimeOffset.Now;
            PaymentState = PaymentState.NewFromType(paymentType);
            TotalPrice = Money.Zero;
        }

        private OrderState GetNextOrderStateByPaymentType(PaymentType paymentType) =>
            paymentType switch
            {
                PaymentType.Card => OrderState.AwaitingPayment,
                PaymentType.Cash => OrderState.Processing,
                _ => throw new InvalidOperationException("Unknown payment type"),
            };

#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        private Order() { }
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.

        public DateTimeOffset OrderDateTime { get; private set; }

        public string Number { get; private set; }

        public long SiteId { get; private set; }
        public long OrganisationId { get; private set; }

        public string? CustomerNotes { get; private set; }

        public OrderStateDescription StateDescription { get; private set; }

        public IReadOnlyList<OrderItem> Items => items;

        public Address ShippingAddress { get; private set; }

        public CustomerDetails CustomerDetails { get; private set; }
        
        public Money TotalPrice { get; private set; }

        public PaymentState PaymentState { get; private set; }

        public bool IsWaitingForPayment => StateDescription.OrderState == OrderState.AwaitingPayment;

        public bool BelongsToAnonymousUser => !CustomerDetails.BuyerId.HasValue;

        public void AddProduct(Product product, decimal quantity, ExtraOption[] extraOptions)
        {
            if (quantity <= 0) throw new ArgumentException($"{nameof(quantity)} must be grater than 0", nameof(quantity));

            if (product is null) throw new ArgumentNullException(nameof(product));

            if (StateDescription.OrderState != OrderState.Draft) throw new DomainException($"Can't add item to order in state {StateDescription}");

            if (product.SiteId != SiteId) throw new DomainException("Given product does not belong to same Site as Order");

            List<OrderItemExtraOption> orderExtraOptions =
                extraOptions.Select(x => new OrderItemExtraOption(x.Name, x.Price with { }, x.Id)).ToList();
            var extraOptionsPrice = orderExtraOptions.Select(x => x.Price with { }).Sum();

            var item = new OrderItem(
                product.Name, 
                product.Id, 
                product.Price with { }, 
                quantity, 
                product.Description, 
                product.Image, 
                OrganisationId,
                orderExtraOptions);

            items.Add(item);
            TotalPrice += item.Quantity * (item.ProductPrice + extraOptionsPrice);
        }

        public void Submit()
        {
            OrderState state = GetNextOrderStateByPaymentType(this.PaymentState.Type);
            StateDescription = new OrderStateDescription(state);
        }
        public void StartProcessing()
        {
            if (StateDescription.OrderState == OrderState.AwaitingPayment)
            {
                StateDescription = new OrderStateDescription(OrderState.Processing);
            }
            else
            {
                throw new InvalidOperationException($"Only {OrderState.AwaitingPayment} orders can be marked as Processing");
            }
        }

        public void Complete()
        {
            if (StateDescription.OrderState == OrderState.Processing)
            {
                StateDescription = new OrderStateDescription(OrderState.Completed);
            }
            else
            {
                throw new InvalidOperationException($"Only ${OrderState.Processing} orders can be marked as Completed");
            }
        }

        public void Cancel(string reason)
        {
            if (StateDescription.OrderState == OrderState.Processing || StateDescription.OrderState == OrderState.AwaitingPayment)
            {
                StateDescription = new OrderStateDescription(OrderState.Canceled, reason);
            }
            else
            {
                throw new InvalidOperationException($"Only {OrderState.Processing} or {OrderState.AwaitingPayment} orders can be Canceled");
            }
        }

        public void ConfirmPayment(long paymentTransactionId)
        {
            if(!StateDescription.IsOpen)
            {
                throw new InvalidOperationException("Order already completed");
            }

            if (!PaymentState.CanAcceptPayment)
            {
                if(PaymentState.PaymentTransactionId == paymentTransactionId)
                {
                    // Do nothing if same paymentId is sent to have idempotent behaviour.
                    return;
                }
                else
                {
                    throw new InvalidOperationException("Order already paied");
                }
            }

            string stateDescription = $"Payment confirmation no: {paymentTransactionId}";
            StateDescription = new OrderStateDescription(OrderState.Processing, stateDescription);

            PaymentState = PaymentState.Paid(paymentTransactionId);
        }
    }
}