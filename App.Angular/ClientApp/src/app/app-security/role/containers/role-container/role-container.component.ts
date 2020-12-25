import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { DataTableDefine } from '../../../../app-core/data-table-controls/models/data-table.model';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { RoleComponent } from '../role/role.component';
@Component({
    selector: 'app-role-container',
    templateUrl: './role-container.component.html',
    styleUrls: ['./role-container.component.scss']
})
export class RoleContainerComponent implements OnInit, AfterViewInit {
    dataTableDefinitions: DataTableDefine = new DataTableDefine();
    dataSource: any[];
    pageInfo = {
        pageSize: 5,
        total: 0,
        pageSizeOptions: [5, 10],
    };


    constructor(private roleService: RoleService, private dialog: MatDialog) {
    }

    ngAfterViewInit() {


    }

    ngOnInit(): void {
        this.dataTableDefinitions = this.roleService.getDataTableDefinitions();
        this.roleService.get({
            pageIndex: 0, pageSize: 5, sortedColumn: 'name',
            sortDirection: 'asc', searchValue: ''
        }).subscribe(source => {
            this.dataSource = source.results;

            this.pageInfo.total = source.recordsTotal;
        });
    }
    onRowActions(data) {

        const dialogRef = this.dialog.open(RoleComponent, {data: {
          name: data.row.name,
          product: data.row.product,
          rowVersion: data.row.rowVersion
      }});
        dialogRef.afterClosed().subscribe(
            () => {
                this.roleService.get({
                    pageIndex: 0, pageSize: 5, sortedColumn: 'name',
                    sortDirection: 'asc', searchValue: ''
                }).subscribe(source => {
                    this.dataSource = source.results;
                    this.pageInfo.total = source.recordsTotal;
                });
            }
        );
    }
    OnPageSourceChanged(data) {
        this.roleService.get({
            pageIndex: data.pageIndex, pageSize: data.pageSize,
            sortedColumn: data.sortName, sortDirection: data.sortDesc, searchValue: ''
        }).subscribe(source => {
            this.dataSource = source.results;

            this.pageInfo.total = source.recordsTotal;
        });
    }
    OnSearchActions(data) {
        this.roleService.get({
            pageIndex: 0, pageSize: 5, sortedColumn: 'name',
            sortDirection: 'asc', searchValue: data
        }).subscribe(source => {
            this.dataSource = source.results;

            this.pageInfo.total = source.recordsTotal;
        });
    }
    onAdd(){

        const dialogRef = this.dialog.open(RoleComponent, { data: {
          name: '',
          product: '',
          rowVersion: 0
      }});
        dialogRef.afterClosed().subscribe(
            () => {
                this.roleService.get({
                    pageIndex: 0, pageSize: 5, sortedColumn: 'name',
                    sortDirection: 'asc', searchValue: ''
                }).subscribe(source => {
                    this.dataSource = source.results;
                    this.pageInfo.total = source.recordsTotal;
                });
            }
        );
    }
}
