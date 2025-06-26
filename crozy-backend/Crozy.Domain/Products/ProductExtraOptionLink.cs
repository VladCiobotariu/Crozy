namespace Crozy.Domain.Products
{
    public record class ProductExtraOptionLink
    {
        public ProductExtraOptionLink(long productId, long extraOptionId)
        {
            ProductId = productId;
            ExtraOptionId = extraOptionId;
        }

        public long ProductId { get; }
        public long ExtraOptionId { get; }
    }
}
