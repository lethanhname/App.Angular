import { Injectable } from '@angular/core';
import * as Highcharts from 'highcharts';

@Injectable({
  providedIn: 'root'
})
export class DashboardWidgetService {
  highcharts: typeof Highcharts = Highcharts;
  constructor() {
  }

  reflowWidgets() {

    if (this.highcharts && this.highcharts.charts) {

      this.highcharts.charts.forEach(chart => {

        // ERROR TypeError: Cannot read property 'reflow' of undefined
        if (chart) {
          chart.reflow();
        }

      });

    }

  }
}
