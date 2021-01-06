import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from '../app.shared.materials.modules';
import { DataTableModule } from '../app-core/data-table-controls/data-table.module';
import { FormControlsModule } from '../app-core/form-controls/form-controls.module';
import { CoreCommonModule } from '../app-core/core-common/core-common.module';
import { AppProductRoutingModule } from './app-product-routing.module';
import { StockGroupListComponent } from './stock-group/containers/stock-group-list/stock-group-list.component';
import { StockGroupUpdateComponent } from './stock-group/containers/stock-group-update/stock-group-update.component';
import { StockTypeListComponent } from './stock-type/containers/stock-type-list/stock-type-list.component';
import { StockTypeUpdateComponent } from './stock-type/containers/stock-type-update/stock-type-update.component';
import { DialogSpinnerModule } from '../app-core/dialog-spinner/dialog-spinner.module';
@NgModule({
    declarations: [
        StockGroupListComponent,
        StockGroupUpdateComponent,
        StockTypeListComponent,
        StockTypeUpdateComponent
    ],
    imports: [
        CommonModule,
        SharedMaterialModule,
        DataTableModule,
        FormControlsModule,
        CoreCommonModule,
        DialogSpinnerModule,

        AppProductRoutingModule
    ],
})
export class AppProductModule { }
