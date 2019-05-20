import {Component, OnInit} from '@angular/core';
import {MAT_DATE_FORMATS} from '@angular/material';
import {MatDatepickerWrapperComponent} from '../mat-datepicker-wrapper/mat-datepicker-wrapper.component';


export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-mat-datepicker-wrapper-mmyyyy',
  templateUrl: './mat-datepicker-wrapper-mmyyyy.component.html',
  styleUrls: ['./mat-datepicker-wrapper-mmyyyy.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class MatDatepickerWrapperMmyyyyComponent extends MatDatepickerWrapperComponent implements OnInit {

  constructor() { super(); }

}
