import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { HomeService } from './services/home.service';
import { Product } from './models/product.model';
import { Vendor } from './models/vendor.model';
import { Select } from './models/select.model';
import { MatStepper } from '@angular/material/stepper';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

    formGroup: FormGroup;
    products: Product[];
    vendors: Vendor[];
    itSystem: false;
    requests: Select[] = [
        { value: 'Vendor', viewValue: 'Looking for a Vendor/Partner Unit' },
        { value: 'Consultant', viewValue: 'Looking for an Independent Consultant' },
        { value: 'Survey', viewValue: 'Need a Survey' }
    ];
    domains: Select[] = [
        { value: 'BusinessSolution', viewValue: 'Business Solution' },
        { value: 'FrameworkService', viewValue: 'Framework Service' }
    ];
    errorMessage: string;

    get formArray(): AbstractControl | null { return this.formGroup.get('formArray'); }
    @ViewChild('stepper') stepper;
    constructor(private formBuilder: FormBuilder, public homeService: HomeService) { }

    ngOnInit() {

        this.getProducts();
        this.getVendors();

        this.formGroup = this.formBuilder.group({
            formArray: this.formBuilder.array([
                this.formBuilder.group({
                    domain: ['', Validators.required]
                }),
                this.formBuilder.group({
                    itSystem: [false, Validators.required],
                    yourRequest: ['', Validators.required]
                }),
                this.formBuilder.group({
                    productCode: ['', Validators.required]
                }),
                this.formBuilder.group({
                    vendorCode: ['', Validators.required]
                }),
            ])
        });
    }
    onChange(event: any) {
        this.itSystem = event.checked;
    }
    getProducts() {
        this.homeService.getProducts().subscribe(
            res => this.products = res, error => this.errorMessage = (error as any)
        );
    }

    getVendors() {
        this.homeService.getVendors().subscribe(
            res => this.vendors = res, error => this.errorMessage = (error as any)
        );
    }

    onSubmit() {
        console.warn(this.formGroup.value);
    }

    resetStepper(stepper: MatStepper){
        stepper.reset();
        this.itSystem = false;
     }
}
