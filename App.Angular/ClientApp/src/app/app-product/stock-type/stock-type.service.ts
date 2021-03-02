import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { StockType } from './stock-type.model';
import { Validators } from '@angular/forms';
import { FieldConfig } from '../../app-core/form-controls/models/field.interface';
import { ColumnDefine, DataTableDefine } from '../../app-core/data-table-controls/models/data-table.model';
import { map, catchError } from 'rxjs/operators';
import { StockGroup } from '../stock-group/stock-group.model';
import { DataType } from 'src/app/app-core/data-table-controls/models/data-type.enum';
@Injectable({
    providedIn: 'root'
})
export class StockTypeService {

    private serviceUrl = '/api/StockTypeApi/GetAll';

    constructor(private http: HttpClient) { }

    getDataTableDefinitions() {
        const columns: ColumnDefine[] = [
            new ColumnDefine({ columnDef: 'code', header: 'code', isVisible: true }),
            new ColumnDefine({ columnDef: 'stockGroupCode', header: 'StockGroupCode', isVisible: true }),
            new ColumnDefine({ columnDef: 'stockGroupCodeDesc', header: 'StockGroup', isVisible: true }),
            new ColumnDefine({ columnDef: 'description', header: 'description', isVisible: true }),
            new ColumnDefine({ columnDef: 'isActive', header: 'isActive', dataType: DataType.Bool, isVisible: true }),
            new ColumnDefine({ columnDef: 'rowVersion', header: 'rowVersion', isVisible: false })
        ];

        const displayedColumns = ['code', 'isActive', 'stockGroupCodeDesc', 'description', 'actions'];

        const gridDefinitions: DataTableDefine = {
            columns,
            displayedColumns,
            showNonePrimaryAction: false,
            rowActions: [
                { actionKey: 'Edit', actionLabel: 'Edit', primaryAction: true },
                { actionKey: 'Delete', actionLabel: 'Delete', primaryAction: true }
            ]
        };
        return gridDefinitions;
    }

    get(pageIndex: number, pageSize: number, sortedColumn: string, sortDirection: string, searchValue: string)
        : Observable<any> {

        const skip = pageSize * pageIndex;
        return this.http.get(this.serviceUrl, {
            params: new HttpParams()
                .set('Skip', skip.toString())
                .set('Take', pageSize.toString())
                .set('OrderColumn', sortedColumn === undefined ? '' : sortedColumn.toString())
                .set('SortDirection', sortDirection.toString())
                .set('Draw', '')
                .set('SearchValue', searchValue.toString())
        });
    }
    public create(model: StockType): Observable<any> {
        const body: string = JSON.stringify(model);

        // Sends an authenticated request.
        return this.http.post('/api/StockTypeApi/Update', body).pipe(
            map((response: Response) => {
                return response;
            }),
            catchError((error: any) => {
                return throwError(error);
            }));
    }
    public delete(code: string): Observable<any> {
        const body: string = JSON.stringify(code);

        // Sends an authenticated request.
        return this.http.post('/api/StockTypeApi/Delete', body).pipe(
            map((response: Response) => {
                return response;
            }),
            catchError((error: any) => {
                return throwError(error);
            }));
    }

    getControls(model: StockType) {
        const selectedStockGroup: StockGroup = {
            code: model.stockGroupCode,
            description: model.stockGroupCodeDesc,
            isActive: true,
            rowVersion: 0
        };
        const regConfig: FieldConfig[] = [
            {
                type: 'input',
                label: 'code',
                inputType: 'text',
                name: 'code',
                value: model.code,
                hidden: model.rowVersion > 0,
                validations: [
                    {
                        name: 'required',
                        validator: Validators.required,
                        message: 'code Required'
                    },
                    {
                        name: 'maxlength',
                        validator: Validators.maxLength(20),
                        message: 'The max length is 20'
                    }
                ]
            },
            {
                type: 'textarea',
                label: 'description',
                inputType: '',
                name: 'description',
                value: model.description,
                hidden: false,
                validations: [
                    {
                        name: 'maxlength',
                        validator: Validators.maxLength(200),
                        message: 'The max length is 200'
                    }
                ]
            },
            {
                type: 'select',
                selectDataUrl: '/api/StockGroupApi/GetAll',
                selectBindValue: 'code',
                selectBindLabel: 'description',
                selectTemplate: 'stockGroupTemplate',
                label: 'StockGroup',
                inputType: '',
                name: 'stockGroupCode',
                value: model.stockGroupCode,
                selectedItem: selectedStockGroup,
                hidden: false,
                validations: [
                    {
                        name: 'maxlength',
                        validator: Validators.maxLength(200),
                        message: 'The max length is 200'
                    }
                ]
            },
            {
                type: 'checkbox',
                label: 'isActive',
                inputType: '',
                name: 'isActive',
                value: model.isActive,
                hidden: false
            },
            {
                type: 'input',
                label: 'Row Version',
                inputType: 'text',
                name: 'rowVersion',
                value: model.rowVersion,
                hidden: true
            }
        ];
        return regConfig;
    }
}
