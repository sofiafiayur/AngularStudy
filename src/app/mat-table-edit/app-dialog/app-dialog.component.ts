import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { InLineEditField } from '../mat-table-edit.component';

export const TABLE_EDIT_ADDED = 'added';
export const TABLE_EDIT_UPDATED = 'updated';
export const TABLE_EDIT_DELETED = 'deleted';
export const TABLE_EDIT_CLOSED = 'closed';
export const OPERATION_ADD = 'a';
export const OPERATION_DELETE = 'd';
export const OPERATION_EDIT = 'e';

export interface DialogData {
  operation: string;
  data: any;
  columns: InLineEditField[];
}

@Component({
  selector: 'app-app-dialog',
  templateUrl: './app-dialog.component.html',
  styleUrls: ['./app-dialog.component.scss']
})
export class AppDialogComponent implements OnInit {
  dialogForm: FormGroup;
  operation: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, public dialog: MatDialog, public dialogRef: MatDialogRef<AppDialogComponent>, ) { }

  ngOnInit() {
    // console.log('inizio app-dialog.component', this.data);
    this.operation = 'd';
    if (this.data && this.data.operation) {
      this.operation = this.data.operation;
    }
    this.dialogForm = new FormGroup({});
    if (this.data.columns) {
      this.data.columns.forEach(element => {
        let valore = this.data.data[element.id];
        this.dialogForm.addControl(element.id, new FormControl({value: valore, disabled: false}));
      });
    }
  }

  public close(type: string) {
    console.log('app-dialog close - type', type);
    this.dialogRef.close({
//      data: this.data.data
    });
}

  public confirm(type: string) {
    // console.log('app-dialog confirm - type', type);
    if (type === OPERATION_DELETE || type === OPERATION_ADD || type === OPERATION_EDIT) { 
      this.refreshData(type);
      this.dialogRef.close({
        data: this.data.data
      });
    } else { // close
      this.dialogRef.close({
        // data: null,
        operation: TABLE_EDIT_CLOSED

      });
    }
  }

  private refreshData(type: string) {
    if (this.data.data) {
      let operation = '';
      if (type === OPERATION_DELETE) {
         operation = TABLE_EDIT_DELETED;
         this.data.data['operation'] = operation;
      }
      if (type === OPERATION_ADD) {
        operation = TABLE_EDIT_ADDED;
        this.data.data['operation'] = operation;
      }
      if (type === OPERATION_EDIT) {
        operation = TABLE_EDIT_UPDATED;
        this.data.data['operation'] = operation;
      }
      if (this.data.columns) {
          this.data.columns.forEach(element => {
          let valore = this.dialogForm.controls[element.id].value;
          this.data.data[element.id] = valore;
        });
      }
    }
  }

}
