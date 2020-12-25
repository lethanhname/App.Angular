import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { FieldConfig } from '../../../../app-core/form-controls/models/field.interface';
import { Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppRole } from '../../models/role.model';
@Component({
    selector: 'app-role',
    templateUrl: './role.component.html',
    styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

    @ViewChild('Child1Form', { static: false }) form1;
    errorMessages: any[] = [];
    regConfig: FieldConfig[] = [
    ];

    constructor(private roleService: RoleService, private dialogRef: MatDialogRef<RoleComponent>, @Inject(MAT_DIALOG_DATA) data) {
        this.regConfig = this.roleService.getControls({name: data.name, product: data.product, rowVersion: data.rowVersion});
    }

    ngOnInit(): void {
    }
    onSubmit() {

        this.roleService.create(this.form1.form.value).subscribe(
            (res: any) => {
                if (res.succeeded) {
                    this.dialogRef.close(this.form1.form.value);
                } else {
                    this.errorMessages = res.errors;
                }
            },
            (error: any) => {
                this.errorMessages.push({ description: 'Server error. Try later.' });
            });
    }
    close() {
        this.dialogRef.close();
    }
}
