using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Crozy.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddMissingNetopiaMappingsForTransactions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PaymentState_PaymentMessageId",
                table: "Orders",
                newName: "PaymentState_PaymentTransactionId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_PaymentState_PaymentTransactionId",
                table: "Orders",
                column: "PaymentState_PaymentTransactionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_PaymentTransactions_PaymentState_PaymentTransactionId",
                table: "Orders",
                column: "PaymentState_PaymentTransactionId",
                principalTable: "PaymentTransactions",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_PaymentTransactions_PaymentState_PaymentTransactionId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_PaymentState_PaymentTransactionId",
                table: "Orders");

            migrationBuilder.RenameColumn(
                name: "PaymentState_PaymentTransactionId",
                table: "Orders",
                newName: "PaymentState_PaymentMessageId");
        }
    }
}
