import { RowAction } from '../models/data-table.interface';
import { DataType } from '../models/data-type.enum';
export class ColumnDefine {
    columnDef: string;
    header: string;
    dataType?: DataType;
    dataFormat?: string;
    isVisible: boolean;
    constructor(options: {
        columnDef: string,
        header: string,
        dataType?: DataType,
        dataFormat?: string,
        isVisible?: boolean,
    }) {
        this.columnDef = options.columnDef;
        this.header = options.header;
        this.dataType = options.dataType || DataType.Text;
        this.dataFormat = options.dataFormat || '';
        this.isVisible = options.isVisible || false;
    }

    cell(element: any) {
        return element[this.columnDef];
    }

}


export class DataTableDefine {
    columns: ColumnDefine[] = [];
    displayedColumns: string[];
    rowActions: RowAction[];
    showNonePrimaryAction: boolean;
    constructor() {
        this.columns = [];
        this.displayedColumns = [];
        this.rowActions = [];
        this.showNonePrimaryAction = false;
    }
}
