namespace Crozy.Domain.Products
{
    public record class ProductCategoryLink
    {
        public ProductCategoryLink(long productId, long categoryId)
        {
            ProductId = productId;
            CategoryId = categoryId;
        }

        public long ProductId { get; private set; }

        public long CategoryId { get; private set; }
    }
}
