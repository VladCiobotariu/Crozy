using Crozy.GraphQL.Auth.Orders;
using Crozy.GraphQL.Auth.Organisations;
using Crozy.GraphQL.Auth.Users;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Identity.Web;
using Microsoft.AspNetCore.Authorization;

namespace Crozy.GraphQL.Auth
{
    public static class IServiceCollectionExtensions
    {
        public static IServiceCollection AddGraphQLPolicies(this IServiceCollection services)
        {
            var orgOwnResourceRequirement = new OrganisationOwnsResourceRequirement();

            services.AddAuthorization(options =>
            {
                options.AddPolicy(Policies.IsSeller, policy =>
                    policy.RequireClaim(ClaimConstants.Scope, Claims.Administration));

                options.AddPolicy(Policies.IsCustomer, policy =>
                    policy.RequireClaim(ClaimConstants.Scope, Claims.Shopping));

                options.AddPolicy(Policies.CanCreateOrgEntities, policy =>
                    policy.AddRequirements(new OrganisationPermissionRequirement(Permissions.WriteOrganisationEntity)));

                options.AddPolicy(Policies.CanEditOrgEntities, policy =>
                    policy.AddRequirements(new OrganisationPermissionRequirement(Permissions.WriteOrganisationEntity), orgOwnResourceRequirement));
                
                options.AddPolicy(Policies.CanManageUserAccess, policy =>
                    policy.AddRequirements(new OrganisationPermissionRequirement(Permissions.ManageUserAccess), orgOwnResourceRequirement));

                options.AddPolicy(Policies.CanDeleteOrgEntities, policy =>
                    policy.AddRequirements(new OrganisationPermissionRequirement(Permissions.WriteOrganisationEntity), orgOwnResourceRequirement));

                options.AddPolicy(Policies.CanReadOrgEntities, policy =>
                    policy.AddRequirements(new OrganisationPermissionRequirement(Permissions.ReadOrganisationEntity)));

                options.AddPolicy(Policies.CanViewOrder, policy =>
                    policy.AddRequirements(new CanViewOrderRequirement()));

                options.AddPolicy(Policies.CanGeneratePaymentForOrder, policy =>
                    policy.AddRequirements(new CanGeneratePaymentForOrderRequirement()));

                options.AddPolicy(Policies.CanViewUserResource, policy =>
                    policy.AddRequirements(new CanViewUserResourceRequirement()));
                
                options.AddPolicy(Policies.CanViewSellerFields, policy =>
                    policy.AddRequirements(new CanViewSellersRequirement()));
                
                //options.AddPolicy("HasCountry", policy =>
                //    policy.RequireAssertion(context =>
                //        context.User.HasClaim(c => c.Type == ClaimTypes.Country)));
            });

            services.AddScoped<IAuthorizationHandler, OrganisationOwnsResourceHandler>();
            services.AddScoped<IAuthorizationHandler, OrganisationPermissionHandler>();
            services.AddScoped<IAuthorizationHandler, ViewOrderPermissionsHandler>();
            services.AddScoped<IAuthorizationHandler, CanGeneratePaymentForOrderHandler>();
            services.AddScoped<IAuthorizationHandler, ViewUserPermissionHandler>();
            services.AddScoped<IAuthorizationHandler, ViewSellersHandler>();
            services.AddScoped<IPermissionService, PermissionService>();

            return services;
        }
    }
}
