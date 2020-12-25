import { Component, ViewChild, Input, Output, EventEmitter, IterableDiffers, Injector, DoCheck } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { Sort, MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { DataTableDefine, ColumnDefine } from '../models/data-table.model';


import { DataType } from '../models/data-type.enum';
import { PageDataInfo } from '../models/data-table.interface';

@Component({
    selector: 'app-data-table',
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements DoCheck {
    @Input() DataTableDefines: DataTableDefine;
    @Input() DataSource: any[];
    @Input() PageInfo: PageDataInfo;

    @Output() OnRowActions = new EventEmitter<any>();
    @Output() OnPageSourceChanged = new EventEmitter<any>();
    @Output() OnSearchActions = new EventEmitter<any>();
    @Output() OnClearSearchActions = new EventEmitter<any>();

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;

    GridSource: MatTableDataSource<any>;
    DataColumnType = DataType;
    selection = new SelectionModel<any>(true, []);
    searchingText = '';

    pageEventInfo: PageEvent;
    sortEventInfo: Sort;

    private differ: any;
    private differs: IterableDiffers;
    constructor(injector: Injector) {
        this.GridSource = new MatTableDataSource<any>();
        this.differs = injector.get(IterableDiffers, null);
        if (this.differs != null) {
            this.differ = this.differs.find([]).create(null);
        }
    }

    ngDoCheck() {
        const change = this.differ.diff(this.DataSource);
        if (change) {
            this.GridSource = new MatTableDataSource<any>(this.DataSource);
        }
    }

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.GridSource.data.length;
        return numSelected === numRows;
    }

    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.GridSource.data.forEach(row => this.selection.select(row));
    }

    RowActions(action, row) {

        this.OnRowActions.emit({ action, row, searchingText: this.searchingText });
    }

    onPageChange(pageEvent: PageEvent) {
        this.pageEventInfo = pageEvent;
        this.onFireSourceChanged(this.pageEventInfo, this.sortEventInfo, this.searchingText);
    }
    onSortChange(sort: Sort) {
        this.sortEventInfo = sort;
        this.onFireSourceChanged(this.pageEventInfo, this.sortEventInfo, this.searchingText);
    }

    onFireSourceChanged(pageInfo: PageEvent, sortInfo: Sort, searchText: string) {
        this.OnPageSourceChanged.emit(
            {
                pageIndex: pageInfo != null ? pageInfo.pageIndex : 0,
                pageSize: pageInfo != null ? pageInfo.pageSize : this.PageInfo.pageSize,
                sortName: sortInfo != null ? sortInfo.active : '',
                sortDesc: sortInfo != null ? sortInfo.direction : '',
                searchText
            });
    }

    search() {
        this.OnSearchActions.emit(this.searchingText);
    }
}
