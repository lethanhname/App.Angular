import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'highchart-column',
  templateUrl: './highchart-column.component.html',
  styleUrls: ['./highchart-column.component.scss']
})
export class HighchartColumnComponent implements OnInit, OnChanges {
  @Input() chartTitle: string;
  @Input() chartSubTitle: string;
  @Input() yAxisTitle: string;
  @Input() categoriesData = [];
  @Input() seriesData = [];

  chart: Chart;

  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges){
    if (changes.seriesData){
      console.log(this.seriesData);
      if (this.seriesData.length > 0){
        this.chart = new Chart({
          chart: {
            type: 'column'
          },
          title: {
              text: this.chartTitle
          },
          subtitle: {
              text: this.chartSubTitle
          },
          xAxis: {
            categories: this.categoriesData,
            crosshair: true
          },
          yAxis : {
              min: 0,
              title: {
                text: this.yAxisTitle
              }
          },
          tooltip : {
              headerFormat: '<span style = "font-size:10px">{point.key}</span><table>',
              pointFormat: '<tr><td style = "color:{series.color};padding:0">{series.name}: </td>' +
                '<td style = "padding:0"><b>{point.y:.1f}</b></td></tr>', footerFormat: '</table>', shared: true, useHTML: true
          },
          plotOptions : {
              column: {
                pointPadding: 0.2,
                borderWidth: 0
              }
          },
          series: this.seriesData
        });
        this.chart.ref$.subscribe(console.log);
      }
    }
  }
}
