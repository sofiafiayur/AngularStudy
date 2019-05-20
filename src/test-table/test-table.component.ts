import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {of} from 'rxjs';
import { InLineEditField } from '../mat-table-edit/mat-table-edit.component';

/*
export interface tableData {
  lasttName: string;
  firstName: string;
  id: number;
  updatedAt: string;
  createdAt: string;
}
*/

@Component({
  template: `<input [(ngModel)]="value" class="vdl-textbox" style="margin-bottom: 0px !important;" [value]="value" [type]="type"
             (change)="valueChange.emit(value)">`
})
export class AppInputInlineComponent implements OnInit {
  @Input() value: any;
  @Input() type: String = 'text';
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {
    console.log('AppInputInlineComponent value', this.value);
  }
}

@Component({
  selector: 'app-test-table',
  templateUrl: './test-table.component.html',
  styleUrls: ['./test-table.component.scss']
})
export class TestTableComponent implements OnInit {

  headers: Array<any> = ['Checkbox', 'InputInline', 'Textbox', 'DropdownList'];
//   dataset: Array<any> = [
//     [{
//       value: 1,
//       component: CheckboxComponent,
//       // component: AppInlineInputComponent,
//       // inputs: {value: 1},
//       // outputs: {valueChange: (value: any) => {
//         // console.log('CheckboxComponent.valueChange()', value);
//       // }}
//     },
//     {
//       value: 1,
//       component: AppInputInlineComponent,
//       // // component: AppInlineInputComponent,
//       // inputs: {value: 1},
//       // outputs: {valueChange: (value: any) => {
//       //   // console.log('AppInputInlineComponent.valueChange()', value);
//       // }}
//     },
//     {
//       value: 1,
//       component: TextboxComponent,
//       // component: AppInlineInputComponent,
//       // inputs: {},
//       // outputs: {valueChange: (value: any) => {
//       //   console.log('AppInputInlineComponent.valueChange()', value);
//       // }}
//     },
//     {
//       value: 1,
//       component: DropdownListComponent,
//       // component: AppInlineInputComponent,
//       inputs: {options: []},
//       // outputs: {valueChange: (value: any) => {
//       //   console.log('AppInputInlineComponent.valueChange()', value);
//       // }}
//     },
//     ]
//   ];

//   dataset2 = [
//   [
//     {
//       value: 1,
//       typeComponent: 'matinput'
//     },
//     {
//       value: 1,
//       typeComponent: 'matselect'
//     },
//     {
//       value: 1,
//       typeComponent: 'matautocomplete'
//     },
//     {
//       value: 1,
//       typeComponent: 'matdatepicker'
//     },
//   ],
//   [
//     {
//       value: 1,
//       typeComponent: 'matinput'
//     },
//     {
//       value: 1,
//       typeComponent: 'matselect'
//     },
//     {
//       value: 1,
//       typeComponent: 'matautocomplete'
//     },
//     {
//       value: 1,
//       typeComponent: 'matdatepicker'
//     },
//   ],
//   [
//     {
//       value: 1,
//       typeComponent: 'matinput'
//     },
//     {
//       value: 1,
//       typeComponent: 'matselect'
//     },
//     {
//       value: 1,
//       typeComponent: 'matautocomplete'
//     },
//     {
//       value: 1,
//       typeComponent: 'matdatepicker'
//     },
//   ],
//   [
//     {
//       value: 1,
//       typeComponent: 'matinput'
//     },
//     {
//       value: 1,
//       typeComponent: 'matselect'
//     },
//     {
//       value: 1,
//       typeComponent: 'matautocomplete'
//     },
//     {
//       value: 1,
//       typeComponent: 'matdatepicker'
//     },
//   ],
//   [
//     {
//       value: 1,
//       typeComponent: 'matinput'
//     },
//     {
//       value: 1,
//       typeComponent: 'matselect'
//     },
//     {
//       value: 1,
//       typeComponent: 'matautocomplete'
//     },
//     {
//       value: 1,
//       typeComponent: 'matdatepicker'
//     },
//   ],
//   [
//     {
//       value: 1,
//       typeComponent: 'matinput'
//     },
//     {
//       value: 1,
//       typeComponent: 'matselect'
//     },
//     {
//       value: 1,
//       typeComponent: 'matautocomplete'
//     },
//     {
//       value: 1,
//       typeComponent: 'matdatepicker'
//     },
//   ],
// ];

 list = [
    {
      name: 'Option One',
      value: 1
    },
    {
      name: 'Option Two',
      value: 2
    },
    {
      name: 'Option Three',
      value: 3
    },
    {
      name: 'Option Four',
      value: 4
    },
    {
      name: 'Option Five',
      value: 5
    },
    {
      name: 'Option Six',
      value: 6
    }
  ];

  tableData = [
    {id: 1,  c1: 'Antonio1', d1: 'Rossi1', createdAt: '01/04/2019', autocomplete: 'uno', updatedAt: '04/2019'},
    {id: 2,  c1: 'Antonio2', d1: 'Rossi2', createdAt: '01/04/2019', autocomplete: 'uno', updatedAt: '04/2019'},
    {id: 3,  c1: 'Antonio3', d1: 'Rossi3', createdAt: '01/04/2019', autocomplete: 'uno', updatedAt: '05/2019'},
    {id: 4,  c1: 'Antonio4', d1: 'Rossi4', createdAt: '01/04/2019', autocomplete: 'uno', updatedAt: '06/2019'},
    {id: 5,  c1: 'Antonio5', d1: 'Rossi5', createdAt: '01/04/2019', autocomplete: 'uno', updatedAt: '05/2019'},
    {id: 6,  c1: 'Antonio6', d1: 'Rossi6', createdAt: '01/04/2019', autocomplete: 'uno', updatedAt: '05/2019'},
    {id: 7,  c1: 'Antonio7', d1: 'Rossi7', createdAt: '01/04/2019', autocomplete: 'uno', updatedAt: '05/2019'},
    {id: 8,  c1: 'Antonio8', d1: 'Rossi8', createdAt: '01/04/2019', autocomplete: 'uno', updatedAt: '05/2019'},
  ];

  id: string;
  editable: boolean;
  type: string; // date,input,autocomplete

  fields: InLineEditField[] = [
    {id: 'actions', label: 'actions', editable: false, type: 'actions', length: 5},
    {id: 'id', label: 'id', editable: false, length: 5},
    {id: 'c1', label: 'firstName', editable: false, type: 'input', length: 30},
    {id: 'd1', label: 'lastName', editable: true, type: 'input', length: 30},
    // {id: 'autocomplete', label: 'autocomplete', editable: true, type: 'autocomplete',  length: 10,  options: of([{ key: 'uno', value: 'Uno'}, { key: 'due', value: 'Due'}, { key: 'tre', value: 'Tre'}])},
    {id: 'createdAt', label: 'createdAt', editable: true, type: 'date', dateFormat: 'DD/MM/YYYY', length: 10},
    {id: 'updatedAt', label: 'updatedAt', editable: true, type: 'date', dateFormat: 'MM/YYYY', length: 10},
  ];

  constructor() { }

  ngOnInit() {
  }

  onSubmit(event: any) {
    // console.log('TestTableComponent', this.dataset);
  }
  get(row: any) {
    // this.tableData = row;
    console.log('row get', row);
  }
  update(row: any) {
    this.get(row);
    console.log('row update', row);
  }
  delete(row: any) {
    console.log('this.tableData', this.tableData);
  }

  action(row: any) {

    if (row.operation === 'added') {
      // this.create( row);
      // this.yourMessage.push('success', row.firstName + ' has been added successfully!')
      // this.yourMessage = []
    }
    if (row.operation === 'updated') {
      this.update(row);
      // this.yourMessage.push('success', row.firstName + ' has been updated successfully!')
      // this.yourMessage = []
    }
    if (row.operation === 'deleted') {
      this.delete(row.id);
      // this.yourMessage.push('success', ' has been deleted successfully!')
      // this.yourMessage = []
    }

  }
}
