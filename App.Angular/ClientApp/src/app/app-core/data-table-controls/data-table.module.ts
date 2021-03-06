﻿import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedMaterialModule } from '../../app.shared.materials.modules';
import { DataTableComponent } from './components/data-table.component';
import { MatTableExporterModule } from 'mat-table-exporter';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule,
        SharedMaterialModule,
        MatTableExporterModule
    ],
    declarations: [DataTableComponent],
    exports: [DataTableComponent]
})
export class DataTableModule { }

