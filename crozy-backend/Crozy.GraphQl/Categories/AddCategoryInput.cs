namespace Crozy.GraphQL.Categories
{
    public record AddCategoryInput(
        string name,
        string slug,
        int displayNumber,
        string? description);
}