using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mock.Migrations
{
    /// <inheritdoc />
    public partial class AddExperienceYearsToJob : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                      name: "ExperienceYears",
    table: "Jobs",
    type: "int",
    nullable: false,
    defaultValue: 0); // או כל ערך ברירת מחדל שתרצי
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
              name: "ExperienceYears",
              table: "Jobs");
        }
    }
}

