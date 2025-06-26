using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Crozy.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddColumnsForCustomerDetailsNamesOrder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CustomerDetails_FirstName",
                table: "Orders",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CustomerDetails_LastName",
                table: "Orders",
                type: "text",
                nullable: false,
                defaultValue: "");
            
            //first query if buyerId exists
            migrationBuilder.Sql(@"
                UPDATE ""Orders""
                SET ""CustomerDetails_FirstName"" = u.""FirstName"",
                    ""CustomerDetails_LastName"" = u.""LastName""
                FROM ""Buyers"" b
                JOIN ""Users"" u ON b.""UserId"" = u.""Id""
                WHERE ""Orders"".""CustomerDetails_BuyerId"" = b.""Id""
                  AND (""Orders"".""CustomerDetails_FirstName"" IS NULL OR ""Orders"".""CustomerDetails_FirstName"" = '' 
                       OR ""Orders"".""CustomerDetails_LastName"" IS NULL OR ""Orders"".""CustomerDetails_LastName"" = '');
            ");

            //second query for buyerId null
            migrationBuilder.Sql(@"
                UPDATE ""Orders""
                    SET ""CustomerDetails_FirstName"" = 'Default',
                        ""CustomerDetails_LastName"" = 'Default'
                    WHERE ""CustomerDetails_BuyerId"" IS NULL;
            ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CustomerDetails_FirstName",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "CustomerDetails_LastName",
                table: "Orders");
        }
    }
}
