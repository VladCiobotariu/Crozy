using Crozy.Domain;
using Crozy.Domain.Users;
using Crozy.Domain.Buyers;
using Crozy.Domain.Products;
using Crozy.Domain.Categories;
using Crozy.Domain.Moneys;
using Crozy.Domain.Sites;
using Crozy.Domain.Orders;
using Crozy.Domain.Organisations;
using Crozy.Domain.Sellers;
using Crozy.Domain.Services;
using Crozy.Infrastructure;
using Crozy.Infrastructure.Options;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Crozy.GraphQLApi
{
    public class DbSeederService
    {
        private readonly CrozyDbContext dbContext;
        private readonly IInvitationCodeGeneratorService invitationCodeGenerator;
        private readonly IOptions<InfrastructureOptions> options;

        public DbSeederService(CrozyDbContext dbContext, IOptions<InfrastructureOptions> options, IInvitationCodeGeneratorService invitationCodeGenerator)
        {
            this.dbContext = dbContext;
            this.options = options ?? throw new ArgumentNullException(nameof(options));
            this.invitationCodeGenerator = invitationCodeGenerator;
        }

        public void Initialize()
        {

            //var databaseCreated = dbContext.Database.EnsureCreated();
            //if (!options.Value.RunInMemoryDB)
            //{
            //    dbContext.Database.Migrate();
            //}

            string organisationName1 = "Demo org SRL";
            var organisation1 = dbContext.Organisations.FirstOrDefault(x => x.Name == organisationName1);

            if (organisation1 is null)
            {
                organisation1 = new Organisation(organisationName1);
                dbContext.Organisations.Add(organisation1);
                dbContext.SaveChanges();
            }
            
            var site1 = new Site("Delta Cafe", "delta-cafe", organisation1.Id);
            var site2 = new Site("Test Cafe", "test-cafe", organisation1.Id);

            if (dbContext.Sites.FirstOrDefault(x => x.Slug == site1.Slug) is null)
            {
                dbContext.Sites.Add(site1);
            }

            if (dbContext.Sites.FirstOrDefault(x => x.Slug == site2.Slug) is null)
            {
                dbContext.Sites.Add(site2);
            }

            var category1 = new Category("Cafea", "cafea", organisation1.Id, 1);
            if (dbContext.Categories.FirstOrDefault(x => x.Slug == category1.Slug) is null)
            {
                dbContext.Categories.Add(category1);

                dbContext.SaveChanges();

                var products = new[]
                {
                    new Product("Cinnamon cafe latte", site1.Id, new Money(14, Currency.RON), "cinnamon-cafe-latte", organisation1.Id, [], "(espresso, lapte, crema de lapte, sirop scortisoara, frisca) 7 gr cafea/ 10 gr zahar/ 180 ml lapte", "img ulr"),
                    new Product("Caffe americano", site1.Id, new Money(12, Currency.RON), "caffe-americano", organisation1.Id, [], "(espresso, apa calda) 7 gr cafea/10gr zahar", "img url"),
                    new Product("Italian coffee",site1.Id, new Money(15, Currency.RON), "italian-coffee", organisation1.Id, [], "long espresso, amaretto&coffe lichior, frisca", "img url"),
                    new Product("Irish coffee", site1.Id, new Money(16, Currency.RON), "irish-coffee", organisation1.Id, [], "long espresso,irish whiskey,frisca", "img url"),
                    new Product("Mochaccino", site1.Id, new Money(13, Currency.RON), "mochaccino", organisation1.Id, [], "espresso, lapte, crema de lapte, sirop de alune si ciocolata", "img url"),
                    new Product("Mochamint",site1.Id, new Money(15, Currency.RON), "mochamint", organisation1.Id, [], "espresso, lapte,crema de lapte, sirop de alune si ciocolata", "img url"),
                    new Product("Coconut cafe latte", site1.Id, new Money(15, Currency.RON), "coconut-cafe-latte", organisation1.Id, [], "espresso, lapte, crema de lapte, sirop de cocos", "img url")
                };
                foreach (var product in products)
                {
                    product.AddCategory(category1.Id);
                    string image = $"{site1.Slug}-{product.Slug}.jpg";
                    product.UpdateProduct(
                        product.Name, 
                        product.Price, 
                        product.Slug, 
                        product.Description, 
                        image,
                        []);
                    
                    dbContext.Products.Add(product);
                }
                var deliveryOption1 = new Address("Romania", "Tulcea", "Sf. Gheorghe", "Intrare plaja", "", "Livrare la plaja");
                var deliveryOption2 = new Address("Romania", "Tulcea", "Sf. Gheorghe", "I A nr 56", "", "Ridicare personala");
                site1.SetPredefinedDeliveryOptionsOnly(new[] { deliveryOption1, deliveryOption2 });
                dbContext.SaveChanges();
                var shippingAddress1 = new Address("Romania", "jud Timis", "Timisoara", "Cucosilor 25", "Scara 2, ap 1", "Home");
                var shippingAddress2 = new Address("Romania", "jud Timis", "Timisoara", "Cucosilor 25", "Scara 2, ap 1", "Home");
                var shippingAddress3 = new Address("Romania", "jud Timis", "Timisoara", "Cucosilor 25", "Scara 2, ap 1", "Home");
                var customerDetails1 = new CustomerDetails("John", "W", new EmailAddress("test@gmail.com"), new PhoneNumber("+40721123456"));
                var order1 = new Order("Seed-1", site1.Id, 1, shippingAddress1, customerDetails1, PaymentType.Cash);

                var customerDetails2 = new CustomerDetails("John", "W", new PhoneNumber("+40721123456"));
                var order2 = new Order("Seed-2", site1.Id, 1, shippingAddress2, customerDetails2, PaymentType.Cash);

                var customerDetails3 = new CustomerDetails("John", "W", new EmailAddress("test@gmail.com"));
                var order3 = new Order("Seed-3", site1.Id, 1, shippingAddress3, customerDetails3, PaymentType.Cash);

                order1.AddProduct(products[0], 1, []);
                order1.AddProduct(products[1], 3, []);
                order1.Submit();

                order2.AddProduct(products[0], 8, []);
                order2.AddProduct(products[1], 5, []);
                order1.Submit();

                order3.AddProduct(products[0], 2, []);
                order3.AddProduct(products[1], 10, []);
                order1.Submit();

                dbContext.Orders.Add(order1);
                dbContext.Orders.Add(order2);
                dbContext.Orders.Add(order3);
                dbContext.SaveChanges();
            }
            
            var category2 = new Category("Nachos", "nachos", organisation1.Id, 1);
            if (dbContext.Categories.FirstOrDefault(x => x.Slug == category2.Slug) is null)
            {
                dbContext.Categories.Add(category2);
                dbContext.SaveChanges();
            }

            string organisationName2 = "Test org SRL";
            var organisation2 = dbContext.Organisations.FirstOrDefault(x => x.Name == organisationName2);

            if (organisation2 is null)
            {
                organisation2 = new Organisation(organisationName2);
                dbContext.Organisations.Add(organisation2);
                dbContext.SaveChanges();
            }
            
            var site3 = new Site("Mancare Cafe", "mancare-cafe", organisation2.Id);
            var site4 = new Site("Bautura Cafe", "bautura-cafe", organisation2.Id);

            if (dbContext.Sites.FirstOrDefault(x => x.Slug == site3.Slug) is null)
            {
                dbContext.Sites.Add(site3);
            }

            if (dbContext.Sites.FirstOrDefault(x => x.Slug == site4.Slug) is null)
            {
                dbContext.Sites.Add(site4);
            }
            dbContext.SaveChanges();

            var category3 = new Category("Mancare", "manacare", organisation2.Id, 1);
            if (dbContext.Categories.FirstOrDefault(x => x.Slug == category3.Slug) is null)
            {
                dbContext.Categories.Add(category3);
                dbContext.SaveChanges();
            }

            var user1 = new User("b767e081-3766-434b-96d9-320fabca6abb", "Erika", "Rusznak",
                new EmailAddress("erika.rusznak@ozius.solutions"));
            var user2 = new User("27420285-e9df-4e8b-8f75-204994882cd8", "Vlad", "Ciobotariu",
                new EmailAddress("vlad.ciobotariu@ozius.solutions"));
            var user3 = new User("3c9e6cad-a8da-421d-9434-64c0e1ddd7af", "Serghei", "Grajdean",
                new EmailAddress("serghei.grajdean@ozius.solutions"));
            var user4 = new User("99222360-6a24-4c45-a48d-fbca598d7e36", "Serghei", "Grajdean",
                new EmailAddress("grajdeanserghei@gmail.com"));
            var user5 = new User("c165e0e1-16cb-4dee-9121-53a22a749456", "Vlad", "Ciobotariu",
                new EmailAddress("vladciobotariu@gmail.com"));

            if (dbContext.Users.FirstOrDefault(x =>
                    x.EmailAddress.Email == user1.EmailAddress.Email) is null)
            {
                dbContext.Users.Add(user1);
                dbContext.SaveChanges();
                
                var seller = Seller.CreateSellerWithInvitation(organisation1.Id, Role.Admin, user1.EmailAddress with { }, invitationCodeGenerator);
                seller.AcceptInvitation(user1.Id);
                dbContext.Sellers.Add(seller);
                dbContext.SaveChanges();

                var buyer = new Buyer(user1.Id);
                dbContext.Buyers.Add(buyer);
                dbContext.SaveChanges();
            }

            if (dbContext.Users.FirstOrDefault(x =>
                    x.EmailAddress.Email == user2.EmailAddress.Email) is null)
            {
                dbContext.Users.Add(user2);
                dbContext.SaveChanges();
                
                var seller = Seller.CreateSellerWithInvitation(organisation1.Id, Role.Admin, user2.EmailAddress with { }, invitationCodeGenerator);
                seller.AcceptInvitation(user2.Id);
                dbContext.Sellers.Add(seller);
                dbContext.SaveChanges();

                var buyer = new Buyer(user2.Id);
                dbContext.Buyers.Add(buyer);
                dbContext.SaveChanges();
            }

            if (dbContext.Users.FirstOrDefault(x =>
                    x.EmailAddress.Email == user3.EmailAddress.Email) is null)
            {
                dbContext.Users.Add(user3);
                dbContext.SaveChanges();
                
                var seller = Seller.CreateSellerWithInvitation(organisation1.Id, Role.Admin, user3.EmailAddress with { }, invitationCodeGenerator);
                seller.AcceptInvitation(user3.Id);
                dbContext.Sellers.Add(seller);
                dbContext.SaveChanges();

                var buyer = new Buyer(user3.Id);
                dbContext.Buyers.Add(buyer);
                dbContext.SaveChanges();
            }

            if (dbContext.Users.FirstOrDefault(x =>
                    x.EmailAddress.Email == user4.EmailAddress.Email) is null)
            {
                dbContext.Users.Add(user4);
                dbContext.SaveChanges();
                
                var seller = Seller.CreateSellerWithInvitation(organisation1.Id, Role.Admin, user4.EmailAddress with { }, invitationCodeGenerator);
                seller.AcceptInvitation(user4.Id);
                dbContext.Sellers.Add(seller);
                dbContext.SaveChanges();

                var buyer = new Buyer(user4.Id);
                dbContext.Buyers.Add(buyer);
                dbContext.SaveChanges();
            }

            if (dbContext.Users.FirstOrDefault(x =>
                    x.EmailAddress.Email == user5.EmailAddress.Email) is null)
            {
                dbContext.Users.Add(user5);
                dbContext.SaveChanges();
                
                var seller1 = Seller.CreateSellerWithInvitation(organisation1.Id, Role.Admin, user5.EmailAddress with { }, invitationCodeGenerator);
                seller1.AcceptInvitation(user5.Id);
                dbContext.Sellers.Add(seller1);
                dbContext.SaveChanges();
                
                var seller2 = Seller.CreateSellerWithInvitation(organisation2.Id, Role.Admin, user5.EmailAddress with { }, invitationCodeGenerator);
                seller2.AcceptInvitation(user5.Id);
                dbContext.Sellers.Add(seller2);
                dbContext.SaveChanges();

                var buyer = new Buyer(user5.Id);
                dbContext.Buyers.Add(buyer);
                dbContext.SaveChanges();
            }

            dbContext.SaveChanges();
        }
    }
}
