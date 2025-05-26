using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mock.Migrations
{
    /// <inheritdoc />
    public partial class AddAdvantageOrMustToRequirements : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CandidateRequirements_Candidates_IdCandidate",
                table: "CandidateRequirements");

            migrationBuilder.DropForeignKey(
                name: "FK_CandidateRequirements_Requirements_IdRequirement",
                table: "CandidateRequirements");

            migrationBuilder.DropForeignKey(
                name: "FK_CandidateSkills_Candidates_IdCandidate",
                table: "CandidateSkills");

            migrationBuilder.DropForeignKey(
                name: "FK_CandidateSkills_Skills_IdSkills",
                table: "CandidateSkills");

            migrationBuilder.DropForeignKey(
                name: "FK_JobRequirements_Jobs_IdJob",
                table: "JobRequirements");

            migrationBuilder.DropForeignKey(
                name: "FK_JobRequirements_Requirements_IdRequirement",
                table: "JobRequirements");

            migrationBuilder.DropForeignKey(
                name: "FK_JobSkills_Jobs_IdJob",
                table: "JobSkills");

            migrationBuilder.DropForeignKey(
                name: "FK_JobSkills_Skills_IdSkills",
                table: "JobSkills");

            migrationBuilder.DropPrimaryKey(
                name: "PK_JobSkills",
                table: "JobSkills");

            migrationBuilder.DropIndex(
                name: "IX_JobSkills_IdJob",
                table: "JobSkills");

            migrationBuilder.DropIndex(
                name: "IX_JobSkills_IdSkills",
                table: "JobSkills");

            migrationBuilder.DropPrimaryKey(
                name: "PK_JobRequirements",
                table: "JobRequirements");

            migrationBuilder.DropIndex(
                name: "IX_JobRequirements_IdJob",
                table: "JobRequirements");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CandidateSkills",
                table: "CandidateSkills");

            migrationBuilder.DropIndex(
                name: "IX_CandidateSkills_IdCandidate",
                table: "CandidateSkills");

            migrationBuilder.DropIndex(
                name: "IX_CandidateSkills_IdSkills",
                table: "CandidateSkills");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CandidateRequirements",
                table: "CandidateRequirements");

            migrationBuilder.DropIndex(
                name: "IX_CandidateRequirements_IdCandidate",
                table: "CandidateRequirements");

            migrationBuilder.DropColumn(
                name: "JobSkillsId",
                table: "JobSkills");

            migrationBuilder.DropColumn(
                name: "IdJob",
                table: "JobSkills");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "JobSkills");

            migrationBuilder.DropColumn(
                name: "JobRequirementId",
                table: "JobRequirements");

            migrationBuilder.DropColumn(
                name: "AdvantageOrMust",
                table: "JobRequirements");

            migrationBuilder.DropColumn(
                name: "CandidateSkillsId",
                table: "CandidateSkills");

            migrationBuilder.DropColumn(
                name: "IdCandidate",
                table: "CandidateSkills");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "CandidateSkills");

            migrationBuilder.DropColumn(
                name: "CandidateReqId",
                table: "CandidateRequirements");

            migrationBuilder.DropColumn(
                name: "AdvantageOrMust",
                table: "CandidateRequirements");

            migrationBuilder.RenameColumn(
                name: "Mark",
                table: "JobSkills",
                newName: "ListSkillsSkillsId");

            migrationBuilder.RenameColumn(
                name: "IdSkills",
                table: "JobSkills",
                newName: "ListJobJobId");

            migrationBuilder.RenameColumn(
                name: "IdRequirement",
                table: "JobRequirements",
                newName: "ListRequirementRequirementId");

            migrationBuilder.RenameColumn(
                name: "IdJob",
                table: "JobRequirements",
                newName: "ListJobJobId");

            migrationBuilder.RenameIndex(
                name: "IX_JobRequirements_IdRequirement",
                table: "JobRequirements",
                newName: "IX_JobRequirements_ListRequirementRequirementId");

            migrationBuilder.RenameColumn(
                name: "SuccessRate",
                table: "CandidateSkills",
                newName: "ListSkillsSkillsId");

            migrationBuilder.RenameColumn(
                name: "IdSkills",
                table: "CandidateSkills",
                newName: "ListCandidateCandidateId");

            migrationBuilder.RenameColumn(
                name: "IdRequirement",
                table: "CandidateRequirements",
                newName: "ListRequirementRequirementId");

            migrationBuilder.RenameColumn(
                name: "IdCandidate",
                table: "CandidateRequirements",
                newName: "ListCandidateCandidateId");

            migrationBuilder.RenameIndex(
                name: "IX_CandidateRequirements_IdRequirement",
                table: "CandidateRequirements",
                newName: "IX_CandidateRequirements_ListRequirementRequirementId");

            migrationBuilder.AddColumn<int>(
                name: "Mark",
                table: "Skills",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "AdvantageOrMust",
                table: "Requirements",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_JobSkills",
                table: "JobSkills",
                columns: new[] { "ListJobJobId", "ListSkillsSkillsId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_JobRequirements",
                table: "JobRequirements",
                columns: new[] { "ListJobJobId", "ListRequirementRequirementId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_CandidateSkills",
                table: "CandidateSkills",
                columns: new[] { "ListCandidateCandidateId", "ListSkillsSkillsId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_CandidateRequirements",
                table: "CandidateRequirements",
                columns: new[] { "ListCandidateCandidateId", "ListRequirementRequirementId" });

            migrationBuilder.CreateIndex(
                name: "IX_JobSkills_ListSkillsSkillsId",
                table: "JobSkills",
                column: "ListSkillsSkillsId");

            migrationBuilder.CreateIndex(
                name: "IX_CandidateSkills_ListSkillsSkillsId",
                table: "CandidateSkills",
                column: "ListSkillsSkillsId");

            migrationBuilder.AddForeignKey(
                name: "FK_CandidateRequirements_Candidates_ListCandidateCandidateId",
                table: "CandidateRequirements",
                column: "ListCandidateCandidateId",
                principalTable: "Candidates",
                principalColumn: "CandidateId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CandidateRequirements_Requirements_ListRequirementRequirementId",
                table: "CandidateRequirements",
                column: "ListRequirementRequirementId",
                principalTable: "Requirements",
                principalColumn: "RequirementId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CandidateSkills_Candidates_ListCandidateCandidateId",
                table: "CandidateSkills",
                column: "ListCandidateCandidateId",
                principalTable: "Candidates",
                principalColumn: "CandidateId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CandidateSkills_Skills_ListSkillsSkillsId",
                table: "CandidateSkills",
                column: "ListSkillsSkillsId",
                principalTable: "Skills",
                principalColumn: "SkillsId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_JobRequirements_Jobs_ListJobJobId",
                table: "JobRequirements",
                column: "ListJobJobId",
                principalTable: "Jobs",
                principalColumn: "JobId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_JobRequirements_Requirements_ListRequirementRequirementId",
                table: "JobRequirements",
                column: "ListRequirementRequirementId",
                principalTable: "Requirements",
                principalColumn: "RequirementId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_JobSkills_Jobs_ListJobJobId",
                table: "JobSkills",
                column: "ListJobJobId",
                principalTable: "Jobs",
                principalColumn: "JobId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_JobSkills_Skills_ListSkillsSkillsId",
                table: "JobSkills",
                column: "ListSkillsSkillsId",
                principalTable: "Skills",
                principalColumn: "SkillsId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CandidateRequirements_Candidates_ListCandidateCandidateId",
                table: "CandidateRequirements");

            migrationBuilder.DropForeignKey(
                name: "FK_CandidateRequirements_Requirements_ListRequirementRequirementId",
                table: "CandidateRequirements");

            migrationBuilder.DropForeignKey(
                name: "FK_CandidateSkills_Candidates_ListCandidateCandidateId",
                table: "CandidateSkills");

            migrationBuilder.DropForeignKey(
                name: "FK_CandidateSkills_Skills_ListSkillsSkillsId",
                table: "CandidateSkills");

            migrationBuilder.DropForeignKey(
                name: "FK_JobRequirements_Jobs_ListJobJobId",
                table: "JobRequirements");

            migrationBuilder.DropForeignKey(
                name: "FK_JobRequirements_Requirements_ListRequirementRequirementId",
                table: "JobRequirements");

            migrationBuilder.DropForeignKey(
                name: "FK_JobSkills_Jobs_ListJobJobId",
                table: "JobSkills");

            migrationBuilder.DropForeignKey(
                name: "FK_JobSkills_Skills_ListSkillsSkillsId",
                table: "JobSkills");

            migrationBuilder.DropPrimaryKey(
                name: "PK_JobSkills",
                table: "JobSkills");

            migrationBuilder.DropIndex(
                name: "IX_JobSkills_ListSkillsSkillsId",
                table: "JobSkills");

            migrationBuilder.DropPrimaryKey(
                name: "PK_JobRequirements",
                table: "JobRequirements");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CandidateSkills",
                table: "CandidateSkills");

            migrationBuilder.DropIndex(
                name: "IX_CandidateSkills_ListSkillsSkillsId",
                table: "CandidateSkills");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CandidateRequirements",
                table: "CandidateRequirements");

            migrationBuilder.DropColumn(
                name: "Mark",
                table: "Skills");

            migrationBuilder.DropColumn(
                name: "AdvantageOrMust",
                table: "Requirements");

            migrationBuilder.RenameColumn(
                name: "ListSkillsSkillsId",
                table: "JobSkills",
                newName: "Mark");

            migrationBuilder.RenameColumn(
                name: "ListJobJobId",
                table: "JobSkills",
                newName: "IdSkills");

            migrationBuilder.RenameColumn(
                name: "ListRequirementRequirementId",
                table: "JobRequirements",
                newName: "IdRequirement");

            migrationBuilder.RenameColumn(
                name: "ListJobJobId",
                table: "JobRequirements",
                newName: "IdJob");

            migrationBuilder.RenameIndex(
                name: "IX_JobRequirements_ListRequirementRequirementId",
                table: "JobRequirements",
                newName: "IX_JobRequirements_IdRequirement");

            migrationBuilder.RenameColumn(
                name: "ListSkillsSkillsId",
                table: "CandidateSkills",
                newName: "SuccessRate");

            migrationBuilder.RenameColumn(
                name: "ListCandidateCandidateId",
                table: "CandidateSkills",
                newName: "IdSkills");

            migrationBuilder.RenameColumn(
                name: "ListRequirementRequirementId",
                table: "CandidateRequirements",
                newName: "IdRequirement");

            migrationBuilder.RenameColumn(
                name: "ListCandidateCandidateId",
                table: "CandidateRequirements",
                newName: "IdCandidate");

            migrationBuilder.RenameIndex(
                name: "IX_CandidateRequirements_ListRequirementRequirementId",
                table: "CandidateRequirements",
                newName: "IX_CandidateRequirements_IdRequirement");

            migrationBuilder.AddColumn<int>(
                name: "JobSkillsId",
                table: "JobSkills",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "IdJob",
                table: "JobSkills",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "JobSkills",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "JobRequirementId",
                table: "JobRequirements",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "AdvantageOrMust",
                table: "JobRequirements",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CandidateSkillsId",
                table: "CandidateSkills",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "IdCandidate",
                table: "CandidateSkills",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "CandidateSkills",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "CandidateReqId",
                table: "CandidateRequirements",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "AdvantageOrMust",
                table: "CandidateRequirements",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_JobSkills",
                table: "JobSkills",
                column: "JobSkillsId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_JobRequirements",
                table: "JobRequirements",
                column: "JobRequirementId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CandidateSkills",
                table: "CandidateSkills",
                column: "CandidateSkillsId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CandidateRequirements",
                table: "CandidateRequirements",
                column: "CandidateReqId");

            migrationBuilder.CreateIndex(
                name: "IX_JobSkills_IdJob",
                table: "JobSkills",
                column: "IdJob");

            migrationBuilder.CreateIndex(
                name: "IX_JobSkills_IdSkills",
                table: "JobSkills",
                column: "IdSkills");

            migrationBuilder.CreateIndex(
                name: "IX_JobRequirements_IdJob",
                table: "JobRequirements",
                column: "IdJob");

            migrationBuilder.CreateIndex(
                name: "IX_CandidateSkills_IdCandidate",
                table: "CandidateSkills",
                column: "IdCandidate");

            migrationBuilder.CreateIndex(
                name: "IX_CandidateSkills_IdSkills",
                table: "CandidateSkills",
                column: "IdSkills");

            migrationBuilder.CreateIndex(
                name: "IX_CandidateRequirements_IdCandidate",
                table: "CandidateRequirements",
                column: "IdCandidate");

            migrationBuilder.AddForeignKey(
                name: "FK_CandidateRequirements_Candidates_IdCandidate",
                table: "CandidateRequirements",
                column: "IdCandidate",
                principalTable: "Candidates",
                principalColumn: "CandidateId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CandidateRequirements_Requirements_IdRequirement",
                table: "CandidateRequirements",
                column: "IdRequirement",
                principalTable: "Requirements",
                principalColumn: "RequirementId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CandidateSkills_Candidates_IdCandidate",
                table: "CandidateSkills",
                column: "IdCandidate",
                principalTable: "Candidates",
                principalColumn: "CandidateId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CandidateSkills_Skills_IdSkills",
                table: "CandidateSkills",
                column: "IdSkills",
                principalTable: "Skills",
                principalColumn: "SkillsId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_JobRequirements_Jobs_IdJob",
                table: "JobRequirements",
                column: "IdJob",
                principalTable: "Jobs",
                principalColumn: "JobId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_JobRequirements_Requirements_IdRequirement",
                table: "JobRequirements",
                column: "IdRequirement",
                principalTable: "Requirements",
                principalColumn: "RequirementId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_JobSkills_Jobs_IdJob",
                table: "JobSkills",
                column: "IdJob",
                principalTable: "Jobs",
                principalColumn: "JobId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_JobSkills_Skills_IdSkills",
                table: "JobSkills",
                column: "IdSkills",
                principalTable: "Skills",
                principalColumn: "SkillsId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
