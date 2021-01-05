using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace App.Angular.Migrations
{
    public partial class workflow : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Workflow",
                columns: table => new
                {
                    IdentityId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RowVersion = table.Column<int>(nullable: false),
                    WorkflowName = table.Column<string>(nullable: false),
                    State = table.Column<string>(nullable: false),
                    EntityId = table.Column<int>(nullable: false),
                    Assignee = table.Column<string>(nullable: true),
                    Started = table.Column<DateTime>(nullable: false),
                    Completed = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Workflow", x => x.IdentityId);
                });

            migrationBuilder.CreateTable(
                name: "WorkItem",
                columns: table => new
                {
                    IdentityId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TriggerName = table.Column<string>(nullable: false),
                    EntityId = table.Column<int>(nullable: false),
                    WorkflowType = table.Column<string>(nullable: false),
                    Retries = table.Column<int>(nullable: false),
                    Error = table.Column<string>(nullable: true),
                    RowVersion = table.Column<int>(nullable: false),
                    DueDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkItem", x => x.IdentityId);
                });

            migrationBuilder.CreateTable(
                name: "WorkflowHistory",
                columns: table => new
                {
                    IdentityId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RowVersion = table.Column<int>(nullable: false),
                    Created = table.Column<DateTime>(nullable: false),
                    FromState = table.Column<string>(nullable: false),
                    ToState = table.Column<string>(nullable: false),
                    Assignee = table.Column<string>(nullable: true),
                    UserName = table.Column<string>(nullable: true),
                    WorkflowId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkflowHistory", x => x.IdentityId);
                    table.ForeignKey(
                        name: "FK_WorkflowHistory_Workflow_WorkflowId",
                        column: x => x.WorkflowId,
                        principalTable: "Workflow",
                        principalColumn: "IdentityId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "WorkflowVariable",
                columns: table => new
                {
                    IdentityId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RowVersion = table.Column<int>(nullable: false),
                    Type = table.Column<string>(nullable: false),
                    Content = table.Column<string>(nullable: false),
                    WorkflowName = table.Column<string>(nullable: true),
                    WorkflowId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkflowVariable", x => x.IdentityId);
                    table.ForeignKey(
                        name: "FK_WorkflowVariable_Workflow_WorkflowId",
                        column: x => x.WorkflowId,
                        principalTable: "Workflow",
                        principalColumn: "IdentityId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Workflow_WorkflowName_EntityId",
                table: "Workflow",
                columns: new[] { "WorkflowName", "EntityId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowHistory_WorkflowId",
                table: "WorkflowHistory",
                column: "WorkflowId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkflowVariable_WorkflowId",
                table: "WorkflowVariable",
                column: "WorkflowId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WorkflowHistory");

            migrationBuilder.DropTable(
                name: "WorkflowVariable");

            migrationBuilder.DropTable(
                name: "WorkItem");

            migrationBuilder.DropTable(
                name: "Workflow");
        }
    }
}
