using Crozy.Domain.Orders;
using Crozy.Domain.Services;
using Crozy.Messaging.Options;
using HotChocolate.Types.Relay;
using Microsoft.Extensions.Options;
using SlackAPI;

namespace Crozy.Messaging.Services
{
    public class NotificationService : INotificationService
    {
        private readonly SlackTaskClient slackClient;
        private readonly IOptions<NotificationServiceOptions> options;
        private readonly IIdSerializer serializer;
        private readonly UriBuilder uriBuilder;

        public NotificationService(SlackTaskClient slackClient, IOptions<NotificationServiceOptions> options, IIdSerializer serializer)
        {
            if (options is null) throw new ArgumentNullException(nameof(options));
            if (options.Value is null) throw new ArgumentException($"Value field must be set in {nameof(options)}", nameof(options));
            if (string.IsNullOrEmpty(options.Value.AdminHostUrl)) throw new ArgumentException($"{nameof(options.Value.AdminHostUrl)} is missing in {nameof(options)}", nameof(options));
            if (string.IsNullOrEmpty(options.Value.SlackChannelName)) throw new ArgumentException($"{nameof(options.Value.SlackChannelName)} is missing in {nameof(options)}", nameof(options));

            this.slackClient = slackClient;
            this.options = options;
            this.serializer = serializer;
            this.uriBuilder = new UriBuilder(options.Value.AdminHostUrl);
        }

        public async Task SendOrderPlacedNotificationAsync(Order order, CancellationToken cancellationToken)
        {
            var serializedOrderId = serializer.Serialize(null, nameof(Order), order.Id);

            var fields = order.Items.Select(x => new Text
            {
                text = $"{x.ProductName} {x.Quantity} x {x.ProductPrice} RON"
            }).ToArray();

            uriBuilder.Path = $"orders/{serializedOrderId}";
            var orderUrl = uriBuilder.Uri.ToString();

            var messsageBlocks = new IBlock[]{
                    new HeaderBlock
                    {
                        text =  new Text
                        {

                            text = $"A new order has been placed {order.Number}"
                        }
                    },
                    new SectionBlock
                    {
                        text = new Text
                        {
                            type ="mrkdwn",
                            text = "" +
                            $"<{orderUrl}|View order {order.Number}> \n" +
                            "Items:"
                        },
                        fields = fields,
                    },
                    new DividerBlock(),
                    new SectionBlock
                    {
                        text = new Text
                        {
                            type ="mrkdwn",
                            text = "Customer: \n" +
                            $"Name: {order.CustomerDetails.FullName} \n" +
                            $"phone: {order.CustomerDetails.PhoneNumber?.Phone}\n" +
                            $"email: {order.CustomerDetails.Email?.Email}",
                        },
                    },
                    new DividerBlock(),
                    new SectionBlock
                    {
                        text = new Text
                        {
                            type ="mrkdwn",
                            text = $"Shipping Address: loc. {order.ShippingAddress.City} \n {order.ShippingAddress.Line1} \n {order.ShippingAddress.Line2}",
                        },
                    },
                };
            var messageTitle = $"New order has been placed {order.Number}";
            var response = await slackClient.PostMessageAsync(options.Value.SlackChannelName, messageTitle, blocks: messsageBlocks);

        }
    }
}
