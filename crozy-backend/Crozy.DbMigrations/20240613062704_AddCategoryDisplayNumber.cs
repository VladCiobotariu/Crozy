using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Crozy.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddCategoryDisplayNumber : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DisplayNumber",
                table: "Categories",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DisplayNumber",
                table: "Categories");
        }
    }
}
