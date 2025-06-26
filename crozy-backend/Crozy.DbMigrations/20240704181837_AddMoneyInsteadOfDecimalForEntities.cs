using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Crozy.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddMoneyInsteadOfDecimalForEntities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Price",
                table: "Products",
                newName: "Price_Amount");

            migrationBuilder.RenameColumn(
                name: "TotalPrice",
                table: "Orders",
                newName: "TotalPrice_Amount");

            migrationBuilder.RenameColumn(
                name: "ProductPrice",
                table: "OrderItems",
                newName: "ProductPrice_Amount");

            migrationBuilder.AddColumn<string>(
                name: "Price_Currency",
                table: "Products",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "TotalPrice_Currency",
                table: "Orders",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ProductPrice_Currency",
                table: "OrderItems",
                type: "text",
                nullable: false,
                defaultValue: "");
            
            migrationBuilder.Sql(@"
            UPDATE ""Products""
            SET ""Price_Currency"" = 'RON'
            WHERE ""Price_Currency"" = '' OR ""Price_Currency"" IS NULL;
        ");

            migrationBuilder.Sql(@"
            UPDATE ""Orders""
            SET ""TotalPrice_Currency"" = 'RON'
            WHERE ""TotalPrice_Currency"" = '' OR ""TotalPrice_Currency"" IS NULL;
        ");

            migrationBuilder.Sql(@"
            UPDATE ""OrderItems""
            SET ""ProductPrice_Currency"" = 'RON'
            WHERE ""ProductPrice_Currency"" = '' OR ""ProductPrice_Currency"" IS NULL;
        ");

            migrationBuilder.Sql(@"
                UPDATE ""OrderItems""
                SET ""OrderItemTotalPrice_Currency"" = 'RON'
                WHERE ""OrderItemTotalPrice_Currency"" = '' OR ""OrderItemTotalPrice_Currency"" IS NULL;
            ");

            migrationBuilder.Sql(@"
                UPDATE ""OrderItems""
                SET ""OrderItemTotalPrice_Amount"" = (
                    SELECT COALESCE(SUM(oieo.""Price_Amount""), 0) + ""ProductPrice_Amount""
                    FROM ""OrderItemExtraOptions"" oieo
                    WHERE oieo.""OrderItemId"" = ""OrderItems"".""Id""
                ) * ""Quantity""
                WHERE ""OrderItemTotalPrice_Amount"" = 0;
            ");

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Price_Currency",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "TotalPrice_Currency",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "ProductPrice_Currency",
                table: "OrderItems");

            migrationBuilder.RenameColumn(
                name: "Price_Amount",
                table: "Products",
                newName: "Price");

            migrationBuilder.RenameColumn(
                name: "TotalPrice_Amount",
                table: "Orders",
                newName: "TotalPrice");

            migrationBuilder.RenameColumn(
                name: "ProductPrice_Amount",
                table: "OrderItems",
                newName: "ProductPrice");
        }
    }
}
