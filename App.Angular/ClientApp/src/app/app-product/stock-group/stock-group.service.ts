import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { StockGroup } from './stock-group.model';
import { Validators } from '@angular/forms';
import { FieldConfig } from '../../app-core/form-controls/models/field.interface';
import { ColumnDefine, DataTableDefine } from '../../app-core/data-table-controls/models/data-table.model';
import { map, catchError } from 'rxjs/operators';
import { DataType } from 'src/app/app-core/data-table-controls/models/data-type.enum';
@Injectable({
    providedIn: 'root'
})
export class StockGroupService {

    private serviceUrl = '/api/StockGroupApi/GetAll';

    constructor(private http: HttpClient) { }

    getDataTableDefinitions() {
        const columns: ColumnDefine[] = [
            new ColumnDefine({ columnDef: 'code', header: 'Id', isVisible: true }),
            new ColumnDefine({ columnDef: 'description', header: 'Description', isVisible: true }),
            new ColumnDefine({ columnDef: 'isActive', header: 'Active', dataType: DataType.Bool, isVisible: true }),
            new ColumnDefine({ columnDef: 'rowVersion', header: 'rowVersion', isVisible: false })
        ];

        const displayedColumns = ['code', 'isActive', 'description', 'actions'];

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
    public create(model: StockGroup): Observable<any> {
        const body: string = JSON.stringify(model);

        // Sends an authenticated request.
        return this.http.post('/api/StockGroupApi/Update', body).pipe(
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
        return this.http.post('/api/StockGroupApi/Delete', body).pipe(
            map((response: Response) => {
                return response;
            }),
            catchError((error: any) => {
                return throwError(error);
            }));
    }

    getControls(model: StockGroup) {
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
