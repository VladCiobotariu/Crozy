using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Crozy.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ChangeOrderItemTotalPriceFromDecimalToMoney : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "OrderItemTotalPrice",
                table: "OrderItems",
                newName: "OrderItemTotalPrice_Amount");

            migrationBuilder.AddColumn<string>(
                name: "OrderItemTotalPrice_Currency",
                table: "OrderItems",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OrderItemTotalPrice_Currency",
                table: "OrderItems");

            migrationBuilder.RenameColumn(
                name: "OrderItemTotalPrice_Amount",
                table: "OrderItems",
                newName: "OrderItemTotalPrice");
        }
    }
}
