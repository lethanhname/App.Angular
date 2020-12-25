import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'highchart-pie',
  templateUrl: './highchart-pie.component.html',
  styleUrls: ['./highchart-pie.component.scss']
})
export class HighchartPieComponent implements OnInit, OnChanges{
  @Input() chartTitle: string;
  @Input() chartSubTitle: string;
  @Input() chartData = [];

  chart: Chart;

  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges){
    if (changes.chartData){
      console.log(this.chartData);
      if (this.chartData.length > 0){
        this.chart = new Chart({
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie',
          backgroundColor: null,
          options3d: {
            enabled: true,
            alpha: 45,
            beta: 0
          }
        },
        title: {
          text: this.chartTitle,
        },
        subtitle: {
          text: this.chartSubTitle
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.y}</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            depth: 35,
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
          }
        },
        series: [{
          name: 'Brands',
          colorByPoint: true,
          data: this.chartData,
          type: undefined
        }]
      });
        this.chart.ref$.subscribe(console.log);
      }
    }
  }
}
