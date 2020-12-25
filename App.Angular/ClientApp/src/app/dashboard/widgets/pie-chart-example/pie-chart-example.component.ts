import { Component, OnInit } from '@angular/core';
import { HighchartWidgetService } from '../../services/highchart-widget.service';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-pie-chart-example',
  templateUrl: './pie-chart-example.component.html',
  styleUrls: ['./pie-chart-example.component.scss']
})
export class PieChartExampleComponent implements OnInit {

  chartTitle = 'PIE';
  chartData = [];
  subscription: Subscription;
  interval: any;

  constructor(private chartDataService: HighchartWidgetService) { }

  ngOnInit(): void {

    // Set 5 seconds interval to update data again and again
    this.refreshData();
    // this.interval = setInterval(() => {
    //     this.refreshData();
    // }, 5000);
  }

  refreshData(){
    this.chartDataService.getPieData().subscribe(
      response => {
        const marks = response;
        this.chartData = [];
        for (const row of marks) {
          this.chartData.push({
            name: row.name,
            y: row.value,
            sliced: false,
            selected: false
          });
        }
        this.chartData.push({
          name:  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
          y: Math.floor(Math.random() * 30) + 1,
          sliced: false,
          selected: false
        });
    });
  }
}
