import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedMaterialModule } from '../../app.shared.materials.modules';
import { DialogSpinnerComponent, DialogSpinnerDialogComponent } from './dialog-spinner.component';

@NgModule({
    imports: [CommonModule, FormsModule,
        SharedMaterialModule
    ],
    declarations: [DialogSpinnerComponent, DialogSpinnerDialogComponent],
    exports: [DialogSpinnerComponent, DialogSpinnerDialogComponent]
})
export class DialogSpinnerModule { }

