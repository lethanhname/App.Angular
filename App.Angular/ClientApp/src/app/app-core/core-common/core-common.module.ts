import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from '../../app.shared.materials.modules';
import { CommandBarComponent } from './command-bar/command-bar.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
    declarations: [CommandBarComponent, ConfirmDialogComponent],
    imports: [
        CommonModule,
        SharedMaterialModule,
    ],
    exports: [
        CommandBarComponent, ConfirmDialogComponent
    ]
})
export class CoreCommonModule { }
