import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FieldConfig } from '../../models/field.interface';

@Component({
    exportAs: 'dynamicForm',
    selector: 'dynamic-form',
    templateUrl: './dynamic-form.component.html',
    styleUrls: []
})
export class DynamicFormComponent implements OnInit {
    @Input() fields: FieldConfig[] = [];
    form: FormGroup;

    get value() {
        return this.form.value;
    }
    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.form = this.createControl();
    }

    createControl() {
        const group = this.fb.group({});
        this.fields.forEach(field => {
            if (field.type === 'button') { return; }
            const control = this.fb.control(
                field.value,
                this.bindValidations(field.validations || [])
            );
            group.addControl(field.name, control);
        });
        return group;
    }

    bindValidations(validations: any) {
        if (validations.length > 0) {
            const validList = [];
            validations.forEach(valid => {
                validList.push(valid.validator);
            });
            return Validators.compose(validList);
        }
        return null;
    }

    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            control.markAsTouched({ onlySelf: true });
        });
    }
}
