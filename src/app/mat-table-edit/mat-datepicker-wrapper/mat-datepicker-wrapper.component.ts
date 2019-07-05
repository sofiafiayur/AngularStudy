import {Component, Input, OnInit} from '@angular/core';
import {InLineEditField} from '../mat-table-edit.component';
import {MAT_DATE_FORMATS} from '@angular/material';
import {FormControl} from '@angular/forms';


export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-mat-datepicker-wrapper',
  templateUrl: './mat-datepicker-wrapper.component.html',
  styleUrls: ['./mat-datepicker-wrapper.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class MatDatepickerWrapperComponent implements OnInit {

  @Input() column: InLineEditField;
  @Input() columnIndex: number;
  @Input() data: any;

  dateControl: FormControl;

  constructor() { }

  ngOnInit() {
    // this.dateControl = new FormControl(_moment(this.data[this.column.id], this.column.dateFormat ? this.column.dateFormat : 'DD/MM/YYYY'));
  }

  setValue(dateEvent: any): void {
    // this.data[this.column.id] = (this.dateControl.value as _moment.Moment).format(this.column.dateFormat ? this.column.dateFormat : 'DD/MM/YYYY');
  }


}
