using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CASECFP_WebApi.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Cursus",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Duur = table.Column<int>(type: "int", nullable: false),
                    Titel = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cursus", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CursusInstantie",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StartDatum = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    CursusId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CursusInstantie", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CursusInstantie_Cursus_CursusId",
                        column: x => x.CursusId,
                        principalTable: "Cursus",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_CursusInstantie_CursusId",
                table: "CursusInstantie",
                column: "CursusId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CursusInstantie");

            migrationBuilder.DropTable(
                name: "Cursus");
        }
    }
}
