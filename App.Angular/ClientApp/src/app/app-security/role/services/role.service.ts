import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AppRole, Page } from '../models/role.model';
import { SelectedItem } from 'src/app/app-core/data-table-controls/models/data-table.interface';
import { ColumnDefine, DataTableDefine } from 'src/app/app-core/data-table-controls/models/data-table.model';
import { Validators } from '@angular/forms';
import { FieldConfig } from '../../../app-core/form-controls/models/field.interface';
import { map, catchError } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class RoleService {

    private serviceUrl = '/api/RoleApi/GetAll';

    constructor(private http: HttpClient) { }

    getDataTableDefinitions() {
        const columns: ColumnDefine[] = [
            new ColumnDefine({ columnDef: 'name', header: 'Name', isVisible: true }),
            new ColumnDefine({ columnDef: 'product', header: 'Product', isVisible: true }),
            new ColumnDefine({ columnDef: 'rowVersion', header: 'rowVersion', isVisible: true })
        ];

        const displayedColumns = ['name', 'product', 'actions'];

        const gridDefinitions: DataTableDefine = {
            columns,
            displayedColumns,
            showNonePrimaryAction: false,
            rowActions: [
                { actionKey: 'Edit', actionLabel: 'Edit', primaryAction: true }
            ]
        };
        return gridDefinitions;
    }

    get({ pageIndex = 1, pageSize, sortedColumn, sortDirection, searchValue }:
        { pageIndex: number; pageSize: number;
            sortedColumn: string; sortDirection: string; searchValue: string; }): Observable<Page<AppRole>> {

        const skip = pageSize * pageIndex;
        return this.http.get<Page<AppRole>>(this.serviceUrl, {
            params: new HttpParams()
                .set('Skip', skip.toString())
                .set('Take', pageSize.toString())
                .set('OrderColumn', sortedColumn === undefined ? '' : sortedColumn.toString())
                .set('SortDirection', sortDirection.toString())
                .set('Draw', '')
                .set('SearchValue', searchValue.toString())
        });
    }
    public create(model: AppRole): Observable<any> {
        const body: string = JSON.stringify(model);

        // Sends an authenticated request.
        return this.http.post('/api/RoleApi/Create', body).pipe(
            map((response: Response) => {
                return response;
            }),
            catchError((error: any) => {
                return throwError(error);
            }));
    }

    getControls(model: AppRole){
        const regConfig: FieldConfig[] = [
            {
                type: 'input',
                label: 'Name',
                inputType: 'text',
                name: 'name',
                value: model.name,
                hidden: model.rowVersion > 0,
                validations: [
                    {
                        name: 'required',
                        validator: Validators.required,
                        message: 'Name Required'
                    },
                    {
                        name: 'pattern',
                        validator: Validators.pattern('^[a-zA-Z]+$'),
                        message: 'Accept only text'
                    }
                ]
            },
            {
                type: 'input',
                label: 'Product',
                inputType: 'text',
                name: 'product',
                value: model.product,
                hidden: false,
                validations: [
                    {
                        name: 'pattern',
                        validator: Validators.pattern('^[a-zA-Z]+$'),
                        message: 'Accept only text'
                    }
                ]
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
