namespace Crozy.GraphQL.Auth
{
    public static class Policies
    {
        public const string IsSeller = "IsSeller";

        public const string IsCustomer = "IsCustomer";

        public const string CanCreateOrgEntities = "CanCreateOrganisationEntities";
        
        public const string CanManageUserAccess = "CanManageUserAccess";

        public const string CanEditOrgEntities = "CanEditOrgEntities";
        
        public const string CanDeleteOrgEntities = "CanDeleteOrgEntities";

        public const string CanReadOrgEntities = "CanReadOrgEntities";
        
        public const string CanViewOrder = "CanViewOrder";

        public const string CanGeneratePaymentForOrder = "CanGeneratePaymentForOrder";

        public const string CanViewUserResource = "CanViewUserResource";
        
        public const string CanViewSellerFields = "CanViewOrganisationFields";
    }
}
