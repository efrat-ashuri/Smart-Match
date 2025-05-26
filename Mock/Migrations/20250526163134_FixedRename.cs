using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mock.Migrations
{
    /// <inheritdoc />
    public partial class FixedRename : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JobRequirements_ListJobs_ListJobJobId",
                table: "JobRequirements");

            migrationBuilder.DropForeignKey(
                name: "FK_JobSkills_ListJobs_ListJobJobId",
                table: "JobSkills");

            migrationBuilder.DropForeignKey(
                name: "FK_ListJobs_Managers_ManagerId",
                table: "Jobs");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ListJobs",
                table: "Jobs");

            migrationBuilder.RenameTable(
                name: "Jobs",
                newName: "Jobs");

            migrationBuilder.RenameIndex(
                name: "IX_ListJobs_ManagerId",
                table: "Jobs",
                newName: "IX_Jobs_ManagerId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Jobs",
                table: "Jobs",
                column: "JobId");

            migrationBuilder.AddForeignKey(
                name: "FK_JobRequirements_Jobs_ListJobJobId",
                table: "JobRequirements",
                column: "ListJobJobId",
                principalTable: "Jobs",
                principalColumn: "JobId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Jobs_Managers_ManagerId",
                table: "Jobs",
                column: "ManagerId",
                principalTable: "Managers",
                principalColumn: "ManagerId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_JobSkills_Jobs_ListJobJobId",
                table: "JobSkills",
                column: "ListJobJobId",
                principalTable: "Jobs",
                principalColumn: "JobId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JobRequirements_Jobs_ListJobJobId",
                table: "JobRequirements");

            migrationBuilder.DropForeignKey(
                name: "FK_Jobs_Managers_ManagerId",
                table: "Jobs");

            migrationBuilder.DropForeignKey(
                name: "FK_JobSkills_Jobs_ListJobJobId",
                table: "JobSkills");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Jobs",
                table: "Jobs");

            migrationBuilder.RenameTable(
                name: "Jobs",
                newName: "Jobs");

            migrationBuilder.RenameIndex(
                name: "IX_Jobs_ManagerId",
                table: "Jobs",
                newName: "IX_ListJobs_ManagerId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ListJobs",
                table: "Jobs",
                column: "JobId");

            migrationBuilder.AddForeignKey(
                name: "FK_JobRequirements_ListJobs_ListJobJobId",
                table: "JobRequirements",
                column: "ListJobJobId",
                principalTable: "Jobs",
                principalColumn: "JobId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_JobSkills_ListJobs_ListJobJobId",
                table: "JobSkills",
                column: "ListJobJobId",
                principalTable: "Jobs",
                principalColumn: "JobId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ListJobs_Managers_ManagerId",
                table: "Jobs",
                column: "ManagerId",
                principalTable: "Managers",
                principalColumn: "ManagerId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
