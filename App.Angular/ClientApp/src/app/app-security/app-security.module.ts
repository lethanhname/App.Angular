import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSecurityRoutingModule } from './app-security-routing.module';

import { SharedMaterialModule } from '../app.shared.materials.modules';
import { DataTableModule } from '../app-core/data-table-controls/data-table.module';
import { FormControlsModule } from '../app-core/form-controls/form-controls.module';
import { CoreCommonModule } from '../app-core/core-common/core-common.module';

import { RoleContainerComponent } from './role/containers/role-container/role-container.component';
import { RoleComponent } from './role/containers/role/role.component';
@NgModule({
  declarations: [RoleContainerComponent, RoleComponent],
  imports: [
    CommonModule,
    AppSecurityRoutingModule,
    SharedMaterialModule,
    DataTableModule,
    FormControlsModule,
    CoreCommonModule
  ],
  entryComponents: [
    RoleComponent
  ]

})
export class AppSecurityModule { }
