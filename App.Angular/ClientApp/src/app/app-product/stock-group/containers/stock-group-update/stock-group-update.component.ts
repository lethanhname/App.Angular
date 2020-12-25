import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { StockGroupService } from '../../stock-group.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-stock-group-update',
  templateUrl: './stock-group-update.component.html',
  styleUrls: ['./stock-group-update.component.css']
})
export class StockGroupUpdateComponent implements OnInit {

  @ViewChild('Child1Form', { static: false }) form1;
  errorMessages: any[] = [];
  regConfig: any[] = [];

  constructor(private stockGroupService: StockGroupService,
              private dialogRef: MatDialogRef<StockGroupUpdateComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.regConfig = this.stockGroupService.getControls(data);
  }

  ngOnInit(): void {
  }
  onSubmit() {

    this.errorMessages = [];
    this.stockGroupService.create(this.form1.form.value).subscribe(
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
