import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { Dashboard } from '../../../app-core/dashboard-widgets/dashboard/models/dashboard-widgets.model';
import { DashboardService } from '../../services/dashboard.service';
import { PieChartExampleComponent } from '../../widgets/pie-chart-example/pie-chart-example.component';
import { ColumnChartExampleComponent } from '../../widgets/column-chart-example/column-chart-example.component';
import { SimpleColumnChartExampleComponent } from '../../widgets/simple-column-chart-example/simple-column-chart-example.component';

@Component({
  selector: 'app-dashboard-viewer',
  templateUrl: './dashboard-viewer.component.html',
  styleUrls: ['./dashboard-viewer.component.scss']
})
export class DashboardViewerComponent implements OnInit, OnDestroy {
  dashboard: Dashboard = new Dashboard();

  protected subscription: Subscription;
  availableWidgets = {
    pieChartExample : PieChartExampleComponent,
    columChartExample : ColumnChartExampleComponent,
    simpleColumChartExample : SimpleColumnChartExampleComponent,
  };
  constructor(
    private dashboardService: DashboardService,
  ) { }


  ngOnInit() {
    this.subscribe();
  }

  protected subscribe() {
    this.subscription = this.dashboardService.getDashboard('1').subscribe(data => {
      this.dashboard = data;
      console.log(this.dashboard);
    });
  }


  protected unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
