import { GridsterConfig, GridsterItem, GridsterItemComponentInterface } from 'angular-gridster2';
import { Type } from '@angular/core';

export enum DisplayGrid {
  Always = 'always',
  OnDragAndResize = 'onDrag&Resize',
  None = 'none'
}

export enum GridType {
  Fit = 'fit',
  ScrollVertical = 'scrollVertical',
  ScrollHorizontal = 'scrollHorizontal',
  Fixed = 'fixed',
  VerticalFixed = 'verticalFixed',
  HorizontalFixed = 'horizontalFixed'
}


export interface DashboardConfig extends GridsterConfig {


}

export interface DashboardItem extends GridsterItem {
  component?: string;
}


export interface DashboardItemComponentInterface extends GridsterItemComponentInterface {

}


export interface DashboardWidget extends DashboardItem {

}

export class Dashboard {

  id: string;
  name: string;
  widgets: Array<DashboardWidget>;
  constructor() {
    this.id = '';
    this.name = '';
    this.widgets = new Array<DashboardWidget>();
  }

}


