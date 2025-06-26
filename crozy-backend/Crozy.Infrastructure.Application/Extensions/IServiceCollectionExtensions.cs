using Azure;
using Azure.Identity;
using Crozy.Domain.Buyers;
using Crozy.Domain.Categories;
using Crozy.Domain.ExtraOptionCategories;
using Crozy.Domain.ExtraOptions;
using Crozy.Domain.Orders;
using Crozy.Domain.Organisations;
using Crozy.Domain.Products;
using Crozy.Domain.Sellers;
using Crozy.Domain.Services;
using Crozy.Domain.Sites;
using Crozy.Domain.Users;
using Crozy.GraphQL.Auth;
using Crozy.GraphQL.Buyers;
using Crozy.GraphQL.Categories;
using Crozy.GraphQL.Clients;
using Crozy.GraphQL.ConfigurationOptions;
using Crozy.GraphQL.DataLoader;
using Crozy.GraphQL.ExtraOptionCategories;
using Crozy.GraphQL.ExtraOptions;
using Crozy.GraphQL.Images;
using Crozy.GraphQL.Orders;
using Crozy.GraphQL.Organisations;
using Crozy.GraphQL.Payments;
using Crozy.GraphQL.Products;
using Crozy.GraphQL.Sellers;
using Crozy.GraphQL.Sites;
using Crozy.GraphQL.Types;
using Crozy.GraphQL.Users;
using Crozy.Infrastructure.Clients;
using Crozy.Infrastructure.Emails;
using Crozy.Infrastructure.Providers;
using HotChocolate.Execution.Configuration;
using HotChocolate.Types;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Azure;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Crozy.Infrastructure.Application.Extensions
{
    public static class IServiceCollectionExtensions
    {
        public static IServiceCollection AddApplicationInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IMediaServiceClient, MediaServiceClient>()
                .AddAzureClients(x =>
                {
                    var documentsStorageConfig = configuration.GetSection("ImageStorage");
                    x.AddBlobServiceClient(documentsStorageConfig);

                    x.AddEmailClient(configuration.GetSection("EmailService"));

                    x.UseCredential(new DefaultAzureCredential());
                });
            services.AddScoped<IEmailService, EmailService>();
            services.AddOptions<GraphQLConfig>()
                .Configure<IConfiguration>((settings, configuration) =>
                {
                    configuration.GetSection("GraphQL").Bind(settings);
                });
            services.AddSingleton<ImageUrlProvider>();
            services.AddScoped<BuyerService>();
            services.AddScoped<IPaymentService, PaymentsService>();
            services.AddScoped<SellerService>();
            services.AddSingleton<IRandomNumberGeneratorService, RandomNumberGeneratorProvider>();
            services.AddSingleton<IInvitationCodeGeneratorService, InvitationCodeGeneratorProvider>();
            
            return services;
        }

        public static IRequestExecutorBuilder AddCrozyGraphQL(this IRequestExecutorBuilder builder)
        {
            return builder
                .AddHttpRequestInterceptor<GlobalStateHttpRequestInterceptor>()
                .RegisterDbContext<CrozyDbContext>(HotChocolate.Data.DbContextKind.Synchronized)
                .RegisterService<IAuthorizationService>(HotChocolate.ServiceKind.Default)
                .RegisterService<ImageUrlProvider>(HotChocolate.ServiceKind.Default)
                .RegisterService<IPaymentService>(HotChocolate.ServiceKind.Default)
                .RegisterService<ISiteRepository>(HotChocolate.ServiceKind.Default)
                .RegisterService<IUserRepository>(HotChocolate.ServiceKind.Default)
                .RegisterService<IBuyerRepository>(HotChocolate.ServiceKind.Default)
                .RegisterService<ISellerRepository>(HotChocolate.ServiceKind.Default)
                .RegisterService<ICategoryRepository>(HotChocolate.ServiceKind.Default)
                .RegisterService<IOrderRepository>(HotChocolate.ServiceKind.Default)
                .RegisterService<IOrganisationRepository>(HotChocolate.ServiceKind.Default)
                .RegisterService<IProductRepository>(HotChocolate.ServiceKind.Default)
                .RegisterService<IExtraOptionRepository>(HotChocolate.ServiceKind.Default)
                .RegisterService<IExtraOptionCategoryRepository>(HotChocolate.ServiceKind.Default)
                .RegisterService<IMediaServiceClient>(HotChocolate.ServiceKind.Default)
                .RegisterService<INotificationService>(HotChocolate.ServiceKind.Default)
                .RegisterService<IOrderNumberProvider>(HotChocolate.ServiceKind.Default)
                .RegisterService<BuyerService>(HotChocolate.ServiceKind.Default)
                .RegisterService<SellerService>(HotChocolate.ServiceKind.Default)
                .RegisterService<IRandomNumberGeneratorService>(HotChocolate.ServiceKind.Default)
                .RegisterService<IInvitationCodeGeneratorService>(HotChocolate.ServiceKind.Default)
                .RegisterService<IEmailService>(HotChocolate.ServiceKind.Default)
                .AddAuthorization()
                .AddQueryType(d => d.Name(GraphQLTypes.Query))
                    .AddTypeExtension<UserQueries>()
                    .AddTypeExtension<SiteQueries>()
                    .AddTypeExtension<OrderQueries>()
                    .AddTypeExtension<OrganisationQueries>()
                    .AddTypeExtension<ProductQueries>()
                    .AddTypeExtension<CategoryQueries>()
                    .AddTypeExtension<SellerQueries>()
                    .AddTypeExtension<ExtraOptionQueries>()
                    .AddTypeExtension<ExtraOptionCategoryQueries>()
                .AddMutationType(d => d.Name(GraphQLTypes.Mutation))
                    .AddTypeExtension<OrderMutations>()
                    .AddTypeExtension<SiteMutations>()
                    .AddTypeExtension<CategoryMutations>()
                    .AddTypeExtension<ProductMutations>()
                    .AddTypeExtension<BuyerMutations>()
                    .AddTypeExtension<ImagesMutations>()
                    .AddTypeExtension<SellerMutations>()
                    .AddTypeExtension<PaymentsMutation>()
                    .AddTypeExtension<ExtraOptionCategoryMutations>()
                    .AddTypeExtension<ExtraOptionMutations>()
                .AddType<UserType>()
                .AddType<OrganisationType>()
                .AddType<BuyerType>()
                .AddType<SellerType>()
                .AddType<InvitationType>()
                .AddType<SiteType>()
                .AddType<OrderType>()
                .AddType<ProductType>()
                .AddType<SiteSummaryType>()
                .AddType<ImageType>()
                .AddType<CustomerDetailsType>()
                .AddType<ExtraOptionCategoryType>()
                .AddType<ExtraOptionType>()
                .AddType<UploadType>()
                .AddIdSerializer()
                .AddGlobalObjectIdentification()
                .AddFiltering()
                .AddSorting()
                .AddDataLoader<OrganisationByIdDataLoader>()
                .AddDataLoader<SiteByIdDataLoader>()
                .AddDataLoader<OrderByIdDataLoader>()
                .AddDataLoader<CategoryByIdDataLoader>()
                .AddDataLoader<ProductByIdDataLoader>()
                .AddDataLoader<ProductBySlugDataLoader>()
                .AddDataLoader<UserByExternalIdDataLoader>()
                .AddDataLoader<UserByIdDataLoader>()
                .AddDataLoader<SellerByIdDataLoader>()
                .AddDataLoader<BuyerByIdDataLoader>()
                .AddDataLoader<ExtraOptionByIdLoader>()
                .AddDataLoader<ExtraOptionCategoryByIdDataLoader>()
                ;
        }
    }
}
