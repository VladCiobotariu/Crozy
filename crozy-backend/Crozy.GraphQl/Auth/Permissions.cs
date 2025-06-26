namespace Crozy.GraphQL.Auth
{
    public static class Permissions
    {
        public const string DeleteOrganisation = "delete-organisation";
        public const string ReadOrganisationEntity = "read-org-entity";
        public const string WriteOrganisationEntity = "write-org-entity";
        public const string ProcessOrder = "process-order";
        public const string DeliverOrder = "deliver-order";
        public const string ManageUserAccess = "manage-user-access";
        public const string CanViewOrder = "can-view-order";
        public const string CanViewUsers = "can-view-users";
    }
}
