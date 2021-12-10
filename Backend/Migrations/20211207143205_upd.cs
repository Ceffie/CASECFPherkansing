using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    public partial class upd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Cursus_Titel_Code",
                table: "Cursus");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Cursus_Titel_Code",
                table: "Cursus",
                columns: new[] { "Titel", "Code" },
                unique: true);
        }
    }
}
