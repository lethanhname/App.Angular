using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace App.Angular.Migrations
{
    public partial class Product_StockGroup : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "INV_Color",
                columns: table => new
                {
                    Code = table.Column<string>(maxLength: 20, nullable: false),
                    RowVersion = table.Column<int>(nullable: false),
                    Description = table.Column<string>(maxLength: 200, nullable: false),
                    IsActive = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_INV_Color", x => x.Code);
                });

            migrationBuilder.CreateTable(
                name: "INV_Inseam",
                columns: table => new
                {
                    Code = table.Column<string>(maxLength: 20, nullable: false),
                    RowVersion = table.Column<int>(nullable: false),
                    Description = table.Column<string>(maxLength: 200, nullable: false),
                    IsActive = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_INV_Inseam", x => x.Code);
                });

            migrationBuilder.CreateTable(
                name: "INV_InventoryItem",
                columns: table => new
                {
                    Code = table.Column<string>(maxLength: 20, nullable: false),
                    RowVersion = table.Column<int>(nullable: false),
                    Description = table.Column<string>(maxLength: 200, nullable: false),
                    AlternateCode = table.Column<string>(maxLength: 20, nullable: false),
                    IsActive = table.Column<bool>(nullable: false),
                    BaseUnit = table.Column<string>(maxLength: 20, nullable: false),
                    SaleUnit = table.Column<string>(maxLength: 20, nullable: false),
                    PurchaseUnit = table.Column<string>(maxLength: 20, nullable: false),
                    ItemClassCode = table.Column<string>(maxLength: 20, nullable: false),
                    ItemCategoryCode = table.Column<string>(maxLength: 20, nullable: false),
                    CustomCodeCode = table.Column<string>(maxLength: 20, nullable: false),
                    HSCode = table.Column<string>(maxLength: 20, nullable: false),
                    LotTracking = table.Column<bool>(nullable: false),
                    Weight = table.Column<decimal>(nullable: false),
                    WeightUnit = table.Column<string>(maxLength: 20, nullable: false),
                    Volume = table.Column<decimal>(nullable: false),
                    VolumeUnit = table.Column<string>(maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_INV_InventoryItem", x => x.Code);
                });

            migrationBuilder.CreateTable(
                name: "INV_InventorySubItem",
                columns: table => new
                {
                    Code = table.Column<string>(maxLength: 20, nullable: false),
                    RowVersion = table.Column<int>(nullable: false),
                    InventoryCode = table.Column<string>(maxLength: 20, nullable: false),
                    ColorCode = table.Column<string>(maxLength: 20, nullable: false),
                    SizeCode = table.Column<string>(maxLength: 20, nullable: false),
                    SerialNo = table.Column<string>(maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_INV_InventorySubItem", x => x.Code);
                });

            migrationBuilder.CreateTable(
                name: "INV_ItemCategory",
                columns: table => new
                {
                    Code = table.Column<string>(maxLength: 20, nullable: false),
                    RowVersion = table.Column<int>(nullable: false),
                    Description = table.Column<string>(maxLength: 200, nullable: false),
                    StockTypeCode = table.Column<string>(maxLength: 20, nullable: false),
                    StockItem = table.Column<bool>(nullable: false),
                    CapitalizationItem = table.Column<bool>(nullable: false),
                    IsActive = table.Column<bool>(nullable: false),
                    IsGMTSize = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_INV_ItemCategory", x => x.Code);
                });

            migrationBuilder.CreateTable(
                name: "INV_ItemCategoryAttribute",
                columns: table => new
                {
                    Code = table.Column<string>(maxLength: 20, nullable: false),
                    RowVersion = table.Column<int>(nullable: false),
                    ItemCategoryCode = table.Column<string>(maxLength: 20, nullable: false),
                    Description = table.Column<string>(maxLength: 200, nullable: false),
                    IsActive = table.Column<bool>(nullable: false),
                    HasDescription = table.Column<bool>(nullable: false),
                    IsRequired = table.Column<bool>(nullable: false),
                    DataType = table.Column<string>(maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_INV_ItemCategoryAttribute", x => x.Code);
                });

            migrationBuilder.CreateTable(
                name: "INV_ItemCategoryAttributeValue",
                columns: table => new
                {
                    Code = table.Column<string>(maxLength: 20, nullable: false),
                    RowVersion = table.Column<int>(nullable: false),
                    ItemAttributeCode = table.Column<string>(maxLength: 20, nullable: false),
                    Description = table.Column<string>(maxLength: 200, nullable: false),
                    IsActive = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_INV_ItemCategoryAttributeValue", x => x.Code);
                });

            migrationBuilder.CreateTable(
                name: "INV_ItemClass",
                columns: table => new
                {
                    Code = table.Column<string>(maxLength: 20, nullable: false),
                    RowVersion = table.Column<int>(nullable: false),
                    PrefixCode = table.Column<string>(maxLength: 20, nullable: true),
                    Description = table.Column<string>(maxLength: 200, nullable: false),
                    StockTypeCode = table.Column<string>(maxLength: 20, nullable: false),
                    IsActive = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_INV_ItemClass", x => x.Code);
                });

            migrationBuilder.CreateTable(
                name: "INV_ItemClassCategory",
                columns: table => new
                {
                    ItemClassCode = table.Column<string>(maxLength: 20, nullable: false),
                    ItemCategoryCode = table.Column<string>(maxLength: 20, nullable: false),
                    RowVersion = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_INV_ItemClassCategory", x => new { x.ItemClassCode, x.ItemCategoryCode });
                });

            migrationBuilder.CreateTable(
                name: "INV_ItemSize",
                columns: table => new
                {
                    Code = table.Column<string>(maxLength: 20, nullable: false),
                    RowVersion = table.Column<int>(nullable: false),
                    WaistCode = table.Column<string>(maxLength: 20, nullable: false),
                    InseamCode = table.Column<string>(maxLength: 20, nullable: false),
                    ItemCategoryCode = table.Column<string>(maxLength: 20, nullable: false),
                    Description = table.Column<string>(maxLength: 200, nullable: false),
                    IsActive = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_INV_ItemSize", x => x.Code);
                });

            migrationBuilder.CreateTable(
                name: "INV_ProductService",
                columns: table => new
                {
                    Code = table.Column<string>(maxLength: 20, nullable: false),
                    RowVersion = table.Column<int>(nullable: false),
                    ItemCategoryCode = table.Column<string>(maxLength: 20, nullable: false),
                    Description = table.Column<string>(maxLength: 200, nullable: false),
                    IsActive = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_INV_ProductService", x => x.Code);
                });

            migrationBuilder.CreateTable(
                name: "INV_ProductServiceValue",
                columns: table => new
                {
                    Code = table.Column<string>(maxLength: 20, nullable: false),
                    RowVersion = table.Column<int>(nullable: false),
                    ProductServiceCode = table.Column<string>(maxLength: 20, nullable: false),
                    Description = table.Column<string>(maxLength: 200, nullable: false),
                    IsActive = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_INV_ProductServiceValue", x => x.Code);
                });

            migrationBuilder.CreateTable(
                name: "INV_StockGroup",
                columns: table => new
                {
                    Code = table.Column<string>(maxLength: 20, nullable: false),
                    RowVersion = table.Column<int>(nullable: false),
                    Description = table.Column<string>(maxLength: 200, nullable: false),
                    IsActive = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_INV_StockGroup", x => x.Code);
                });

            migrationBuilder.CreateTable(
                name: "INV_StockType",
                columns: table => new
                {
                    Code = table.Column<string>(maxLength: 20, nullable: false),
                    RowVersion = table.Column<int>(nullable: false),
                    StockGroupCode = table.Column<string>(maxLength: 20, nullable: false),
                    Description = table.Column<string>(maxLength: 200, nullable: false),
                    IsActive = table.Column<bool>(nullable: false),
                    IsBOMTemplate = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_INV_StockType", x => x.Code);
                });

            migrationBuilder.CreateTable(
                name: "INV_Unit",
                columns: table => new
                {
                    Code = table.Column<string>(maxLength: 20, nullable: false),
                    RowVersion = table.Column<int>(nullable: false),
                    Description = table.Column<string>(maxLength: 200, nullable: false),
                    IsActive = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_INV_Unit", x => x.Code);
                });

            migrationBuilder.CreateTable(
                name: "INV_Waist",
                columns: table => new
                {
                    Code = table.Column<string>(maxLength: 20, nullable: false),
                    RowVersion = table.Column<int>(nullable: false),
                    Description = table.Column<string>(maxLength: 200, nullable: false),
                    IsActive = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_INV_Waist", x => x.Code);
                });

            migrationBuilder.CreateTable(
                name: "INV_Warehouse",
                columns: table => new
                {
                    Code = table.Column<string>(maxLength: 20, nullable: false),
                    RowVersion = table.Column<int>(nullable: false),
                    Description = table.Column<string>(maxLength: 200, nullable: false),
                    IsActive = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_INV_Warehouse", x => x.Code);
                });

            migrationBuilder.CreateTable(
                name: "PRO_Techpack",
                columns: table => new
                {
                    Code = table.Column<string>(maxLength: 20, nullable: false),
                    RowVersion = table.Column<int>(nullable: false),
                    IsActive = table.Column<bool>(nullable: false),
                    TypeofTechPack = table.Column<string>(maxLength: 20, nullable: false),
                    ProductType = table.Column<string>(maxLength: 20, nullable: false),
                    CustomerCode = table.Column<string>(maxLength: 20, nullable: true),
                    SeasonCode = table.Column<string>(maxLength: 20, nullable: false),
                    StyleCode = table.Column<string>(maxLength: 20, nullable: false),
                    FabricCode = table.Column<string>(maxLength: 20, nullable: false),
                    WashCode = table.Column<string>(maxLength: 20, nullable: false),
                    Embroidery = table.Column<bool>(nullable: false),
                    Printing = table.Column<bool>(nullable: false),
                    Embossing = table.Column<bool>(nullable: false),
                    SAM = table.Column<decimal>(nullable: false),
                    ReceivedDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PRO_Techpack", x => x.Code);
                });

            migrationBuilder.CreateTable(
                name: "PRO_TechpackLine",
                columns: table => new
                {
                    Code = table.Column<string>(maxLength: 20, nullable: false),
                    RevNo = table.Column<int>(nullable: false),
                    LineNbr = table.Column<int>(nullable: false),
                    RowVersion = table.Column<int>(nullable: false),
                    StockHoldCompanyCode = table.Column<string>(maxLength: 20, nullable: true),
                    InventoryCode = table.Column<string>(maxLength: 20, nullable: false),
                    ItemCategoryCode = table.Column<string>(maxLength: 20, nullable: false),
                    Description = table.Column<string>(maxLength: 200, nullable: false),
                    SubItemCode = table.Column<string>(maxLength: 20, nullable: true),
                    ColorCode = table.Column<string>(maxLength: 20, nullable: false),
                    SizeCode = table.Column<string>(maxLength: 20, nullable: false),
                    VendorCode = table.Column<string>(maxLength: 20, nullable: false),
                    BaseUOM = table.Column<string>(maxLength: 20, nullable: false),
                    DimSize = table.Column<string>(maxLength: 20, nullable: false),
                    GMTSizeGroup = table.Column<string>(maxLength: 20, nullable: false),
                    AutoBreak = table.Column<bool>(nullable: false),
                    PerUnitPrice = table.Column<decimal>(nullable: false),
                    ConsumptionUOM = table.Column<string>(maxLength: 20, nullable: false),
                    StandardCons = table.Column<decimal>(nullable: false),
                    Cons_Production = table.Column<decimal>(nullable: false),
                    Cons_Costing = table.Column<decimal>(nullable: false),
                    Cons_Booking = table.Column<decimal>(nullable: false),
                    OrderingCons = table.Column<decimal>(nullable: false),
                    NoCostBlock = table.Column<decimal>(nullable: false),
                    Scrap = table.Column<int>(nullable: false),
                    SubItem_BPOColor = table.Column<bool>(nullable: false),
                    SubItem_GMTLength = table.Column<bool>(nullable: false),
                    SubItem_GMTWaist = table.Column<bool>(nullable: false),
                    SubItem_GMTSize = table.Column<bool>(nullable: false),
                    SubITem_BPONo = table.Column<bool>(nullable: false),
                    Status = table.Column<string>(maxLength: 20, nullable: false),
                    Notes = table.Column<string>(maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PRO_TechpackLine", x => new { x.Code, x.RevNo, x.LineNbr });
                });

            migrationBuilder.CreateTable(
                name: "PRO_TechpackRev",
                columns: table => new
                {
                    Code = table.Column<string>(maxLength: 20, nullable: false),
                    RevNo = table.Column<int>(nullable: false),
                    RowVersion = table.Column<int>(nullable: false),
                    RevNote = table.Column<string>(maxLength: 200, nullable: false),
                    IsPosted = table.Column<bool>(nullable: false),
                    PostedID = table.Column<string>(maxLength: 20, nullable: true),
                    PostedDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PRO_TechpackRev", x => new { x.Code, x.RevNo });
                });

            migrationBuilder.CreateIndex(
                name: "IX_INV_InventoryItem_AlternateCode",
                table: "INV_InventoryItem",
                column: "AlternateCode");

            migrationBuilder.CreateIndex(
                name: "IX_INV_InventoryItem_BaseUnit",
                table: "INV_InventoryItem",
                column: "BaseUnit");

            migrationBuilder.CreateIndex(
                name: "IX_INV_InventoryItem_ItemCategoryCode",
                table: "INV_InventoryItem",
                column: "ItemCategoryCode");

            migrationBuilder.CreateIndex(
                name: "IX_INV_InventoryItem_ItemClassCode",
                table: "INV_InventoryItem",
                column: "ItemClassCode");

            migrationBuilder.CreateIndex(
                name: "IX_INV_InventoryItem_PurchaseUnit",
                table: "INV_InventoryItem",
                column: "PurchaseUnit");

            migrationBuilder.CreateIndex(
                name: "IX_INV_InventoryItem_SaleUnit",
                table: "INV_InventoryItem",
                column: "SaleUnit");

            migrationBuilder.CreateIndex(
                name: "IX_INV_InventoryItem_VolumeUnit",
                table: "INV_InventoryItem",
                column: "VolumeUnit");

            migrationBuilder.CreateIndex(
                name: "IX_INV_InventoryItem_WeightUnit",
                table: "INV_InventoryItem",
                column: "WeightUnit");

            migrationBuilder.CreateIndex(
                name: "IX_INV_InventorySubItem_ColorCode",
                table: "INV_InventorySubItem",
                column: "ColorCode");

            migrationBuilder.CreateIndex(
                name: "IX_INV_InventorySubItem_SerialNo",
                table: "INV_InventorySubItem",
                column: "SerialNo");

            migrationBuilder.CreateIndex(
                name: "IX_INV_InventorySubItem_SizeCode",
                table: "INV_InventorySubItem",
                column: "SizeCode");

            migrationBuilder.CreateIndex(
                name: "IX_INV_ItemCategory_StockTypeCode",
                table: "INV_ItemCategory",
                column: "StockTypeCode");

            migrationBuilder.CreateIndex(
                name: "IX_INV_ItemCategoryAttribute_ItemCategoryCode",
                table: "INV_ItemCategoryAttribute",
                column: "ItemCategoryCode");

            migrationBuilder.CreateIndex(
                name: "IX_INV_ItemCategoryAttributeValue_ItemAttributeCode",
                table: "INV_ItemCategoryAttributeValue",
                column: "ItemAttributeCode");

            migrationBuilder.CreateIndex(
                name: "IX_INV_ItemClass_StockTypeCode",
                table: "INV_ItemClass",
                column: "StockTypeCode");

            migrationBuilder.CreateIndex(
                name: "IX_INV_ItemClassCategory_ItemCategoryCode",
                table: "INV_ItemClassCategory",
                column: "ItemCategoryCode");

            migrationBuilder.CreateIndex(
                name: "IX_INV_ItemClassCategory_ItemClassCode",
                table: "INV_ItemClassCategory",
                column: "ItemClassCode");

            migrationBuilder.CreateIndex(
                name: "IX_INV_ItemSize_InseamCode",
                table: "INV_ItemSize",
                column: "InseamCode");

            migrationBuilder.CreateIndex(
                name: "IX_INV_ItemSize_ItemCategoryCode",
                table: "INV_ItemSize",
                column: "ItemCategoryCode");

            migrationBuilder.CreateIndex(
                name: "IX_INV_ItemSize_WaistCode",
                table: "INV_ItemSize",
                column: "WaistCode");

            migrationBuilder.CreateIndex(
                name: "IX_INV_ProductService_ItemCategoryCode",
                table: "INV_ProductService",
                column: "ItemCategoryCode");

            migrationBuilder.CreateIndex(
                name: "IX_INV_ProductServiceValue_ProductServiceCode",
                table: "INV_ProductServiceValue",
                column: "ProductServiceCode");

            migrationBuilder.CreateIndex(
                name: "IX_INV_StockType_StockGroupCode",
                table: "INV_StockType",
                column: "StockGroupCode");

            migrationBuilder.CreateIndex(
                name: "IX_PRO_Techpack_CustomerCode",
                table: "PRO_Techpack",
                column: "CustomerCode");

            migrationBuilder.CreateIndex(
                name: "IX_PRO_Techpack_FabricCode",
                table: "PRO_Techpack",
                column: "FabricCode");

            migrationBuilder.CreateIndex(
                name: "IX_PRO_Techpack_ProductType",
                table: "PRO_Techpack",
                column: "ProductType");

            migrationBuilder.CreateIndex(
                name: "IX_PRO_Techpack_SeasonCode",
                table: "PRO_Techpack",
                column: "SeasonCode");

            migrationBuilder.CreateIndex(
                name: "IX_PRO_Techpack_StyleCode",
                table: "PRO_Techpack",
                column: "StyleCode");

            migrationBuilder.CreateIndex(
                name: "IX_PRO_Techpack_WashCode",
                table: "PRO_Techpack",
                column: "WashCode");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "INV_Color");

            migrationBuilder.DropTable(
                name: "INV_Inseam");

            migrationBuilder.DropTable(
                name: "INV_InventoryItem");

            migrationBuilder.DropTable(
                name: "INV_InventorySubItem");

            migrationBuilder.DropTable(
                name: "INV_ItemCategory");

            migrationBuilder.DropTable(
                name: "INV_ItemCategoryAttribute");

            migrationBuilder.DropTable(
                name: "INV_ItemCategoryAttributeValue");

            migrationBuilder.DropTable(
                name: "INV_ItemClass");

            migrationBuilder.DropTable(
                name: "INV_ItemClassCategory");

            migrationBuilder.DropTable(
                name: "INV_ItemSize");

            migrationBuilder.DropTable(
                name: "INV_ProductService");

            migrationBuilder.DropTable(
                name: "INV_ProductServiceValue");

            migrationBuilder.DropTable(
                name: "INV_StockGroup");

            migrationBuilder.DropTable(
                name: "INV_StockType");

            migrationBuilder.DropTable(
                name: "INV_Unit");

            migrationBuilder.DropTable(
                name: "INV_Waist");

            migrationBuilder.DropTable(
                name: "INV_Warehouse");

            migrationBuilder.DropTable(
                name: "PRO_Techpack");

            migrationBuilder.DropTable(
                name: "PRO_TechpackLine");

            migrationBuilder.DropTable(
                name: "PRO_TechpackRev");
        }
    }
}
