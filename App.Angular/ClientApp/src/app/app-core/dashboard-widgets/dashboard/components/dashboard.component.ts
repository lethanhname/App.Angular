import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';

import { Subscription } from 'rxjs';

import { DisplayGrid, GridType,
         DashboardConfig, DashboardItemComponentInterface,
         Dashboard, DashboardWidget } from '../models/dashboard-widgets.model';
import { DashboardWidgetService } from '../services/dashboard-widget.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy, OnChanges {
  @Input() dashboard: Dashboard;
  @Input() widgets: {};

  options: DashboardConfig;
  items: DashboardWidget[];
  components = {};
  protected subscription: Subscription;

  constructor(private dashboardWidgetService: DashboardWidgetService) { }

  ngOnInit() {
    this.getOptions();
    this.subscribe();
  }
  ngOnChanges(changes: SimpleChanges){
    if (changes.dashboard){
      this.subscribe();
    }
  }
  getOptions() {
    this.options = {
      disablePushOnDrag: true,
      displayGrid: DisplayGrid.Always,
      draggable: {
        enabled: true,
        ignoreContent: true,
        // dropOverItems: true,
        dropOverItems: false,
        dragHandleClass: 'drag-handler',
        ignoreContentClass: 'no-drag',
      },
      emptyCellDragMaxCols: 50,
      emptyCellDragMaxRows: 50,
      enableEmptyCellClick: false,
      enableEmptyCellContextMenu: false,
      enableEmptyCellDrop: true,
      enableEmptyCellDrag: false,
      gridType: GridType.Fit,
      itemResizeCallback: this.itemResize.bind(this),
      minCols: 12, // 6
      minRows: 12,  // 6
      pushDirections: { north: true, east: true, south: true, west: true },
      pushItems: true,
      resizable: { enabled: false }
      // swap: true,
    };
  }

  protected subscribe() {
    console.log('Dashboard Id: ' + JSON.stringify(this.dashboard.id));
    this.components = this.widgets;
    this.items = this.dashboard.widgets;

    console.log('Widgets: ' + JSON.stringify(this.items));
  }

  protected unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  itemResize(item: DashboardWidget, itemComponent: DashboardItemComponentInterface): void {
    this.dashboardWidgetService.reflowWidgets();
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}

