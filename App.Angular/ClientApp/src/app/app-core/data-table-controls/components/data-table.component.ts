import { Component, ViewChild, Input, Output, EventEmitter, IterableDiffers, Injector, DoCheck, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { Sort, MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { DataTableDefine, ColumnDefine } from '../models/data-table.model';


import { DataType } from '../models/data-type.enum';
import { PageDataInfo } from '../models/data-table.interface';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

@Component({
    selector: 'app-data-table',
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements DoCheck, OnInit {
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
    columnSelectForm: FormGroup;
    displayedColumns$: Observable<string[]> = of([]);
    constructor(injector: Injector, private fb: FormBuilder) {
        this.GridSource = new MatTableDataSource<any>();
        this.differs = injector.get(IterableDiffers, null);
        if (this.differs != null) {
            this.differ = this.differs.find([]).create(null);
        }
    }
    ngOnInit() {
        this.columnSelectForm = this.createControl();
        this.displayedColumns$ = of(this.DataTableDefines.displayedColumns);
    }
    createControl() {
        const group = this.fb.group({});
        this.DataTableDefines.columns.forEach(field => {

            if (field.isVisible) {
                const control = this.fb.control(
                    this.DataTableDefines.displayedColumns.includes(field.columnDef)
                );
                group.addControl(field.columnDef, control);
            }
        });

        return group;
    }
    onSubmit() {
        const columns = Object.keys(this.columnSelectForm.value).filter(a => this.columnSelectForm.value[a] === true);
        // Actions control
        if (this.DataTableDefines.displayedColumns.includes('actions')) {
            columns.push('actions');
        }
        if (this.DataTableDefines.displayedColumns.includes('select')) {
            columns.push('select');
        }
        this.displayedColumns$ = of(columns);
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
