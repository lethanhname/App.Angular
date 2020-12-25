import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard.component';
import { GridsterModule } from 'angular-gridster2';
import { NgxdModule } from '@ngxd/core';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    GridsterModule,
    NgxdModule
  ],
  exports: [
    DashboardComponent
  ],
})

export class DashboardWidgetsModule { }
