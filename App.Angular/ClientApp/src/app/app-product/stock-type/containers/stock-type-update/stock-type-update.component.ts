import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { StockTypeService } from '../../stock-type.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-stock-type-update',
  templateUrl: './stock-type-update.component.html',
  styleUrls: ['./stock-type-update.component.css']
})
export class StockTypeUpdateComponent implements OnInit {

  @ViewChild('Child1Form', { static: false }) form1;
  errorMessages: any[] = [];
  regConfig: any[] = [];

  constructor(private stockTypeService: StockTypeService,
              private dialogRef: MatDialogRef<StockTypeUpdateComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.regConfig = this.stockTypeService.getControls(data);
  }

  ngOnInit(): void {
  }
  onSubmit() {

    this.errorMessages = [];
    this.stockTypeService.create(this.form1.form.value).subscribe(
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

}
