namespace Crozy.GraphQL.Auth
{
    public static class Claims
    {
        public const string Administration = "seller-app";
        public const string Shopping = "shop-app";

        public const string Organisation = "organisation-id";
        public const string InternalUserId = "user-id";
        public const string ExternalId = "external-id";
        public const string InternalBuyerId = "buyer-id";
        public const string InternalSellerId = "seller-id";

        public const string NoSeller = "no-seller";
        public const string NoBuyer = "no-buyer";

        public const string Permission = "permission";
    }
}
