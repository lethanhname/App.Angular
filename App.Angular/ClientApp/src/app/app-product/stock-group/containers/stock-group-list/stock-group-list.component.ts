import { Component, OnInit } from '@angular/core';
import { DataTableDefine } from '../../../../app-core/data-table-controls/models/data-table.model';
import { StockGroupService } from '../../stock-group.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { StockGroupUpdateComponent } from '../stock-group-update/stock-group-update.component';
import { ConfirmDialogComponent } from '../../../../app-core/core-common/confirm-dialog/confirm-dialog.component';
@Component({
    selector: 'app-stock-group-list',
    templateUrl: './stock-group-list.component.html',
    styleUrls: ['./stock-group-list.component.css']
})
export class StockGroupListComponent implements OnInit {
    dataTableDefinitions: DataTableDefine = new DataTableDefine();
    dataSource: any[];
    pageInfo = {
        pageSize: 10,
        total: 0,
        pageSizeOptions: [10, 20, 50],
    };
    isLoading = true;


    constructor(private stockGroupService: StockGroupService, private dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.dataTableDefinitions = this.stockGroupService.getDataTableDefinitions();
        this.loadData();
    }
    onRowActions(data) {
        console.log(data);
        const actionKey = data.action.actionKey;
        switch (actionKey) {
            case 'Delete':
                const code = data.row.code;
                const dialogConfig = this.configDialog();
                dialogConfig.data = {
                    title: 'Confirm Delete',
                    message: 'Are you sure, you want to remove an stock group?'
                };
                const confirmDialog = this.dialog.open(ConfirmDialogComponent, dialogConfig);
                confirmDialog.afterClosed().subscribe(result => {
                    if (result === true) {
                        this.stockGroupService.delete(code).subscribe(
                            (res: any) => {
                                if (res.succeeded) {
                                    this.loadData(data.searchingText);
                                } else {
                                    alert('Server error. Try later.' + res.errors);
                                }
                            },
                            (error: any) => {
                                alert('Server error. Try later.' + error);
                            });
                    }
                });

                break;

            case 'Edit':
                const dialogRef = this.dialog.open(StockGroupUpdateComponent, {
                    data: {
                        code: data.row.code,
                        description: data.row.description,
                        isActive: data.row.isActive,
                        rowVersion: data.row.rowVersion
                    }
                });
                dialogRef.afterClosed().subscribe(
                    () => {
                        this.loadData(data.searchingText);
                    }
                );
                break;
        }
    }
    OnPageSourceChanged(data) {
        this.loadData(data.searchText, data.pageIndex, data.pageSize, data.sortName, data.sortDesc);
    }
    OnSearchActions(data) {
        this.loadData(data);
    }
    onAdd() {

        const dialogRef = this.dialog.open(StockGroupUpdateComponent, {
            data: {
                code: '',
                description: '',
                isActive: true,
                rowVersion: 0
            }
        });
        dialogRef.afterClosed().subscribe(() => this.loadData());
    }

    configDialog() {
        const dialogConfig = new MatDialogConfig();

        // dialogConfig.disableClose = true;
        // dialogConfig.autoFocus = true;
        // dialogConfig.minWidth = '150px';
        // dialogConfig.maxWidth = '500px';
        // dialogConfig.width = '100%';

        return dialogConfig;
    }

    loadData(searchValue = '', pageIndex = 0, pageSize = 10, sortedColumn = 'code', sortDirection = 'asc') {
        this.isLoading = true;
        this.stockGroupService.get(pageIndex, pageSize, sortedColumn, sortDirection, searchValue).subscribe(source => {
            this.dataSource = source.results;
            this.pageInfo.total = source.recordsTotal;
            this.isLoading = false;
        });
    }
}
