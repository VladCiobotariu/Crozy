using Crozy.Domain.Buyers;
using Crozy.Domain.Categories;
using Crozy.Domain.ExtraOptionCategories;
using Crozy.Domain.ExtraOptions;
using Crozy.Domain.Orders;
using Crozy.Domain.Organisations;
using Crozy.Domain.Payments;
using Crozy.Domain.Products;
using Crozy.Domain.Sellers;
using Crozy.Domain.Services;
using Crozy.Domain.Sites;
using Crozy.Domain.Users;
using Crozy.Infrastructure.Options;
using Crozy.Infrastructure.Providers;
using Crozy.Infrastructure.Repositories;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

namespace Crozy.Infrastructure.Extensions
{
    public static class IServiceCollectionExtensions
    {
        public static IServiceCollection AddRepositories(this IServiceCollection services)
        {
            services.AddScoped<ISiteRepository, SiteRepository>()
                .AddScoped<ICategoryRepository, CategoryRepository>()
                .AddScoped<IProductRepository, ProductRepository>()
                .AddScoped<IOrderRepository, OrderRepository>()
                .AddScoped<IOrganisationRepository, OrganisationRepository>()
                .AddScoped<IUserRepository, UserRepository>()
                .AddScoped<ISellerRepository, SellerRepository>()
                .AddScoped<IBuyerRepository, BuyerRepository>()
                .AddScoped<IPaymentTransactionRepository, PaymentTransactionRepository>()
                .AddScoped<IExtraOptionCategoryRepository, ExtraOptionCategoryRepository>()
                .AddScoped<IExtraOptionRepository, ExtraOptionRepository>()
                .AddScoped<DbContextProvider>()
                .AddScoped<IOrderNumberProvider>(services => {
                    var runInMemory = services.GetRequiredService<IOptions<InfrastructureOptions>>().Value.RunInMemoryDB;
                    if(runInMemory)
                    {
                        return new InMemoryOrderNumberProvider();
                    }
                    return services.GetRequiredService<CrozyDbContext>(); })
                ;
            return services;
        }
    }
}
