import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { PieData } from '../models/pie-data.model';
@Injectable({
  providedIn: 'root'
})
export class HighchartWidgetService {
  private readonly PIE = 'assets/data/pie-chart-data.json';
  constructor(protected httpClient: HttpClient) { }

  getPieData(): Observable<PieData[]> {
    return this.httpClient.get<PieData[]>(this.PIE);
  }

  // getChart(chartdId: string): Observable<Chart> {
  //   const chartsObservable = new Observable<Chart>(observer => {
  //     let hightchart: Chart;
  //     if (chartdId === '1') {
  //       this.getPieChart().subscribe(
  //         chart => {
  //           hightchart = chart;
  //           console.log(hightchart);
  //           observer.next(hightchart);
  //         }
  //       );
  //     }
  //     else if (chartdId === '2') {
  //       this.getColumnChart().subscribe(
  //         chart => {
  //           hightchart = chart;
  //           observer.next(hightchart);
  //         }
  //       );
  //     }
  //     else {
  //       this.getLineChart().subscribe(
  //         chart => {
  //           hightchart = chart;
  //           observer.next(hightchart);
  //         }
  //       );
  //     }
  //   });
  //   return chartsObservable;
  // }

  // getLineChart(): Observable<Chart> {
  //   const chartsObservable = new Observable<Chart>(observer => {
  //     const lineChart = new Chart({
  //       chart: {
  //         plotBackgroundColor: null,
  //         plotBorderWidth: null,
  //         plotShadow: false,
  //         type: 'column',
  //         backgroundColor: null,
  //         options3d: {
  //           enabled: true,
  //           alpha: 45,
  //           beta: 0
  //         }
  //       },
  //       title: {
  //         text: 'Monthly Average Rainfall',
  //       },
  //       subtitle: {
  //         text: 'Source: WorldClimate.com'
  //       },
  //       xAxis: {
  //         categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  //         crosshair: true
  //       },
  //       yAxis: {
  //         min: 0,
  //         title: {
  //           text: 'Rainfall (mm)'
  //         }
  //       },
  //       tooltip: {
  //         headerFormat: '<span style = "font-size:10px">{point.key}</span><table>',
  //         pointFormat: '<tr><td style = "color:{series.color};padding:0">{series.name}: </td>' +
  //           '<td style = "padding:0"><b>{point.y:.1f} mm</b></td></tr>', footerFormat: '</table>', shared: true, useHTML: true
  //       },
  //       plotOptions: {
  //         column: {
  //           pointPadding: 0.2,
  //           borderWidth: 0
  //         }
  //       },
  //       series: [{
  //         name: 'Tokyo',
  //         type: 'line',
  //         data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
  //       },
  //       {
  //         name: 'New York',
  //         type: 'line',
  //         data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
  //       },
  //       {
  //         name: 'London',
  //         type: 'line',
  //         data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
  //       },
  //       {
  //         name: 'Berlin',
  //         type: 'line',
  //         data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
  //       }]
  //     });
  //     observer.next(lineChart);
  //   });

  //   return chartsObservable;
  // }

  // getPieChart(): Observable<Chart> {
  //   const chartsObservable = new Observable<Chart>(observer => {
  //     this.getPieData().subscribe(
  //       response => {
  //         const marks = response;
  //         const chartData = [];
  //         for (const row of marks) {
  //           chartData.push({
  //             name: row.name,
  //             y: row.value,
  //             sliced: false,
  //             selected: false
  //           });
  //         }

  //         const pieChart = new Chart({
  //           chart: {
  //             plotBackgroundColor: null,
  //             plotBorderWidth: null,
  //             plotShadow: false,
  //             type: 'pie',
  //             backgroundColor: null,
  //             options3d: {
  //               enabled: true,
  //               alpha: 45,
  //               beta: 0
  //             }
  //           },
  //           title: {
  //             text: 'Angular-6 + Highcharts-6',
  //           },
  //           subtitle: {
  //             text: ''
  //           },
  //           tooltip: {
  //             pointFormat: '{series.name}: <b>{point.y}</b>'
  //           },
  //           plotOptions: {
  //             pie: {
  //               allowPointSelect: true,
  //               cursor: 'pointer',
  //               depth: 35,
  //               dataLabels: {
  //                 enabled: true,
  //                 format: '<b>{point.name}</b>: {point.percentage:.1f} %'
  //               }
  //             }
  //           },
  //           series: [{
  //             name: 'Total Mark',
  //             data: chartData,
  //             type: undefined
  //           }]
  //         });
  //         observer.next(pieChart);
  //       });
  //   });
  //   return chartsObservable;
  // }

  // getColumnChart(): Observable<Chart> {
  //   const chartsObservable = new Observable<Chart>(observer => {
  //     const columnChart = new Chart({
  //       chart: {
  //         type: 'column'
  //      },
  //      title: {
  //         text: 'Monthly Average Rainfall'
  //      },
  //      subtitle: {
  //         text: 'Source: WorldClimate.com'
  //      },
  //      xAxis:{
  //         categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
  //         crosshair: true        
  //      },     
  //      yAxis : {
  //         min: 0,
  //         title: {
  //            text: 'Rainfall (mm)'         
  //         }      
  //      },
  //      tooltip : {
  //         headerFormat: '<span style = "font-size:10px">{point.key}</span><table>',
  //         pointFormat: '<tr><td style = "color:{series.color};padding:0">{series.name}: </td>' +
  //            '<td style = "padding:0"><b>{point.y:.1f} mm</b></td></tr>', footerFormat: '</table>', shared: true, useHTML: true
  //      },
  //      plotOptions : {
  //         column: {
  //            pointPadding: 0.2,
  //            borderWidth: 0
  //         }
  //      },
  //      series: [{
  //         name: 'Tokyo',
  //         data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6,
  //            148.5, 216.4, 194.1, 95.6, 54.4]
  //      }, 
  //      {
  //         name: 'New York',
  //         data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3,
  //            91.2, 83.5, 106.6, 92.3]
  //      }, 
  //      {
  //         name: 'London',
  //         data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6,
  //            52.4, 65.2, 59.3, 51.2]
  //      }, 
  //      {
  //         name: 'Berlin',
  //         data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4,
  //            47.6, 39.1, 46.8, 51.1]
  //      }]
  //     });
  //     observer.next(columnChart);
  //   });

  //   return chartsObservable;
  // }
}
