import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from '../app.shared.materials.modules';

import { DashboardViewerComponent } from './containers/dashboard-viewer/dashboard-viewer.component';
import { ColumnChartExampleComponent } from './widgets/column-chart-example/column-chart-example.component';
import { PieChartExampleComponent } from './widgets/pie-chart-example/pie-chart-example.component';
import { SimpleColumnChartExampleComponent } from './widgets/simple-column-chart-example/simple-column-chart-example.component';

import { DashboardWidgetsModule } from '../app-core/dashboard-widgets/dashboard/dashboard-widgets.module';
import { HighchartWidgetsModule } from '../app-core/dashboard-widgets/highchart/highchart-widgets.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
@NgModule({
  declarations: [DashboardViewerComponent, ColumnChartExampleComponent, PieChartExampleComponent, SimpleColumnChartExampleComponent],
  imports: [
    CommonModule,
    SharedMaterialModule,
    DashboardWidgetsModule,
    HighchartWidgetsModule,
    DashboardRoutingModule
  ],
  exports: [
    DashboardViewerComponent
  ]
})
export class DashboardModule { }
