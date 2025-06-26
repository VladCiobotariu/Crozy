using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Crozy.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddExtraOptions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ExtraOptionCategories",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    OrganisationId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExtraOptionCategories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ExtraOptionCategories_Organisations_OrganisationId",
                        column: x => x.OrganisationId,
                        principalTable: "Organisations",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ExtraOptions",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Price_Amount = table.Column<decimal>(type: "numeric(14,2)", precision: 14, scale: 2, nullable: false),
                    Price_Currency = table.Column<string>(type: "text", nullable: false),
                    ExtraOptionCategoryId = table.Column<long>(type: "bigint", nullable: false),
                    OrganisationId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExtraOptions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ExtraOptions_ExtraOptionCategories_ExtraOptionCategoryId",
                        column: x => x.ExtraOptionCategoryId,
                        principalTable: "ExtraOptionCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ExtraOptions_Organisations_OrganisationId",
                        column: x => x.OrganisationId,
                        principalTable: "Organisations",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "OrderItemExtraOptions",
                columns: table => new
                {
                    OrderItemId = table.Column<long>(type: "bigint", nullable: false),
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Price_Amount = table.Column<decimal>(type: "numeric(14,2)", precision: 14, scale: 2, nullable: false),
                    Price_Currency = table.Column<string>(type: "text", nullable: false),
                    ExtraOptionId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderItemExtraOptions", x => new { x.OrderItemId, x.Id });
                    table.ForeignKey(
                        name: "FK_OrderItemExtraOptions_ExtraOptions_ExtraOptionId",
                        column: x => x.ExtraOptionId,
                        principalTable: "ExtraOptions",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_OrderItemExtraOptions_OrderItems_OrderItemId",
                        column: x => x.OrderItemId,
                        principalTable: "OrderItems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProductExtraOptionLinks",
                columns: table => new
                {
                    ProductId = table.Column<long>(type: "bigint", nullable: false),
                    ExtraOptionId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductExtraOptionLinks", x => new { x.ExtraOptionId, x.ProductId });
                    table.ForeignKey(
                        name: "FK_ProductExtraOptionLinks_ExtraOptions_ExtraOptionId",
                        column: x => x.ExtraOptionId,
                        principalTable: "ExtraOptions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductExtraOptionLinks_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ExtraOptionCategories_OrganisationId",
                table: "ExtraOptionCategories",
                column: "OrganisationId");

            migrationBuilder.CreateIndex(
                name: "IX_ExtraOptions_ExtraOptionCategoryId",
                table: "ExtraOptions",
                column: "ExtraOptionCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_ExtraOptions_OrganisationId",
                table: "ExtraOptions",
                column: "OrganisationId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItemExtraOptions_ExtraOptionId",
                table: "OrderItemExtraOptions",
                column: "ExtraOptionId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductExtraOptionLinks_ProductId",
                table: "ProductExtraOptionLinks",
                column: "ProductId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrderItemExtraOptions");

            migrationBuilder.DropTable(
                name: "ProductExtraOptionLinks");

            migrationBuilder.DropTable(
                name: "ExtraOptions");

            migrationBuilder.DropTable(
                name: "ExtraOptionCategories");
        }
    }
}
