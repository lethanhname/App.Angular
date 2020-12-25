import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedMaterialModule } from '../../app.shared.materials.modules';
import { DataTableComponent } from './components/data-table.component';

@NgModule({
    imports: [CommonModule, FormsModule,
        SharedMaterialModule
    ],
    declarations: [DataTableComponent],
    exports: [DataTableComponent]
})
export class DataTableModule { }

