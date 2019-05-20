import { Component, EventEmitter, Input, OnInit, Output, ViewChild, OnChanges } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { AppDialogComponent, TABLE_EDIT_UPDATED, TABLE_EDIT_ADDED, TABLE_EDIT_DELETED, DialogData } from './app-dialog/app-dialog.component';
import {MatTableDataSource} from '@angular/material/table';
import {Observable} from 'rxjs';

export interface InLineEditFieldOption {
  key: any;
  value: string;
}

export interface InLineEditField {
  id: string;
  editable: boolean;
  key?: boolean;
  type?: string; // date,input,autocomplete,actions
  options?: Observable<InLineEditFieldOption[]>;
  label: string;
  length?: number;
  dateFormat?: string;
  sticky?: boolean; //blocked column
}

@Component({
  selector: 'app-mat-table-edit',
  templateUrl: './mat-table-edit.component.html',
  styleUrls: ['./mat-table-edit.component.scss']
})
export class MatTableEditComponent implements OnInit, OnChanges {
   // Parent to Child
   @Input() data: any;
   @Input() editType: string;
   @Input() columns: InLineEditField[];
   // @Input() editableColumns: any;
   // @Input() dateColumns: any;
   @Input() pageSizeOptions: string[];
   @Input() pagination: boolean;
   @Input() sort: boolean;
   @Input() notification: any;
   @Input() searchable: boolean;
   @Input() maxChar: number;
      // SZ Azioni ammesse per ogni riga (in caso di assenza parametro le azioni di default sono EDIT, DELETE e COPY rows)
   @Input() rowsActions: string[];
   // SZ Azioni ammesse a livelo di tabella (in caso di assenza parametro le azioni di default sono INSERT, FILTER)
   @Input() tableActions: string[];
   @Input() refreshData: boolean;
   bEditRow = true;
   bDeleteRow = true;
   bCopyRow = true;
   bNewRow = true;
   bFilterRows = true;
   
   // Child to Parent
   @Output() action = new EventEmitter<any>();
   @Output() newdata = new EventEmitter<any>();

   // @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
      // SZ Gestione paginazione opzionale
      this.dataSource.paginator = paginator;
   }
   // @ViewChild(MatSort) sort: MatSort;
   @ViewChild(MatSort) set MatSort(sorting: MatSort) {
      // SZ Gestione sort opzionale
      this.dataSource.sort = sorting; // sorting
   }

  //  @ViewChild(DialogComponent) DialogComponent: MatDialog;

   displayedColumns: string[] = [];

   paginationOptions: string[] = [];
  //  readonly notifier: NotifierService;

   k: number;
   selectedColumn: string;
   // rowData: Data;
   isSearchable: boolean;
   selectedRowIndex: Number = -1;
   maxCharsInColumn: number;
   message: string;
   // isEnabled: boolean;
   isAddRequired: boolean;

   dataSource = new MatTableDataSource([]);
   newRowIndex = 0;
   attrib  = 'sticky';

   constructor(public dialog: MatDialog) {}

  ngOnInit() {
    // assign data from Parent component set by the users
    // console.log('mat-table-edit.components - ngoninit', this.refreshData, 'columns ', this.columns);
    this.displayedColumns = this.columns.map( column => {
      return column.id;
    }); // columns

    this.dataSource.data = this.data; // data
    // this.editableFields = this.editableColumns; // editable columns
    // this.dateFields = this.dateColumns; // date type
    this.paginationOptions = this.pageSizeOptions; // page size options
    // this.dataSource.paginator = this.paginator; // pagination
    // this.dataSource.sort = this.sort; // sorting
    this.isSearchable = this.searchable; // search
    this.maxCharsInColumn = this.maxChar; // maximum charatcters in a column
    this.isAddRequired = true; // this is for local dev and testing // this feature will be implemented in next version

    // SZ Azioni ammesse per ogni riga (in caso di assenza parametro le azioni di default sono EDIT, DELETE e COPY rows)
    if (this.rowsActions) {
      // console.log('mat-table-edit azioni righe richieste ', this.rowsActions);
      this.bEditRow = false;
      this.bDeleteRow = false;
      this.bCopyRow = false;
      this.rowsActions.forEach(action => {
        if (action && action.toUpperCase() === 'EDIT') {
          this.bEditRow = true;
        }
        if (action && action.toUpperCase() === 'DELETE') {
          this.bDeleteRow = true;
        }
        if (action && action.toUpperCase() === 'COPY') {
          this.bCopyRow = true;
        }
      });
    }
    // SZ Azioni ammesse per la tabelle (in caso di assenza parametro le azioni di default sono INSERT e FILTER rows)
    if (this.tableActions) {
      // console.log('mat-table-edit azioni tabella richieste ', this.tableActions);
      this.bNewRow = false;
      this.bFilterRows = false;
      this.tableActions.forEach(action => {
        if (action && action.toUpperCase() === 'INSERT') {
          this.bNewRow = true;
        }
        if (action && action.toUpperCase() === 'FILTER') {
          this.bFilterRows = true;
        }
      });
    }

  // private userLocale: string;
  // , private dateAdapter: DateAdapter<any>
  //   let _userLocale = localStorage.getItem(LOCAL_STORE_USER_LANG);
  //   this.userLocale = _userLocale ? _userLocale : LOCALE_IT;
  //   this.dateAdapter.setLocale(this.userLocale);
  }

  ngOnChanges() {
    // assign data from Parent component set by the users
    // console.log('mat-table-edit.components - ngOnChanges', this.refreshData, 'columns ', this.columns);
    if (this.refreshData && this.data) {
      this.dataSource.data = this.data;
      // Gestione eventuale refresh colonne
      if (this.columns) {
          this.displayedColumns = [];
          this.displayedColumns = this.columns.map( column => {
            return column.id;
          });
      }
    }
  }

  // Search
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openEdit(rowData: any, i: number) {
    // console.log('openEdit rowData', rowData, ' i ', i, 'this.editType', this.editType);
    if (this.editType && this.editType === 'dialog') {
      this.openDialog(rowData, i, 'e');
    } else {
      this.k = i;
      this.highlight(rowData);
    }
  }

  openCopy(rowData: any, i: number) {
    // console.log('richiesta copia', i, this.k, rowData);
    let newrow = this.createNewData(i, rowData);
    this.doneEdit(newrow, i + 1);
    this.k = i + 1;
  }

  closeEdit(rowData: any) {
    this.k = -1;
    this.selectedRowIndex = -1;
  }

  formatDate(date: any) {
    let monthNames = [
      'January', 'February', 'March',
      'April', 'May', 'June', 'July',
      'August', 'September', 'October',
      'November', 'December'
    ];

    let day = date.getDate();
    let monthIndex = date.getMonth();
    let year = date.getFullYear();

    return year + '-' + [monthIndex + 1] + '-' + day;
  }

  doneEdit(rowData: any, indexRow: number) {
    // console.log ('inizio doneEdit ', rowData, 'operation', rowData['operation']);
    for (let prop in rowData) {
      if (rowData[prop] instanceof Date) {
        rowData[prop] = this.formatDate(rowData[prop]);
      }
    }
    if (rowData['operation']) {
       if (rowData['operation'] !== TABLE_EDIT_ADDED && rowData['operation'] !== TABLE_EDIT_DELETED) { rowData['operation'] = TABLE_EDIT_UPDATED; }
    } else {
        rowData['operation'] = TABLE_EDIT_UPDATED;
    }

    if (indexRow < 0) {
       this.exitEditMode();
    }

    // this.spinner.show();
    this.action.emit(rowData);
    this.newdata.emit(this.dataSource.data);

    // if (this.notification && this.notification.length > 0) {
    //   this.UI_notifications(this.notification[0], this.notification[1]);
    // }  else {
    //   this.UI_notifications('', 'Update action completed!'); // default update notification
    // }
  }

  openDialog(rowData: any, i: number, operation: string): void { // open a pop up for delete confirmation or add row form
    // console.log('OpenDialog', rowData, ' i ', i, ' operation ', operation, ' column ', this.columns);
    let tipoOperazione = 'e';
    if (operation) {
      tipoOperazione = operation;
    }
    /*
      const dialogRef = this.dialog.open(AppDialogComponent, {
      width: rowData === 'add' ? '300px' : '250px',
      data: rowData === 'add' ? { 'columns': this.columns, 'dateFields': [] } : rowData
    });
    */
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    dialogConfig.width = tipoOperazione === 'd' ? '250px' : '500px';
    dialogConfig.height = tipoOperazione === 'd' ? '180px' : '650px';
    let dialogData = Object.assign({}, {operation: tipoOperazione, data: rowData, columns: this.columns});
    dialogConfig.data = dialogData;
    const dialogRef = this.dialog.open(AppDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      // console.log('OpenDialog AftreClosed', result );
      if (result.data && result.data.operation === TABLE_EDIT_DELETED) { // doneDelete
        this.action.emit(result.data);
        this.removeFromArray(result.data);
        this.newdata.emit(this.dataSource.data);
      }

      if (result.data && (result.data.operation === TABLE_EDIT_ADDED || result.data.operation === TABLE_EDIT_UPDATED)) { // doneAdd
        this.action.emit(result.data);
        this.newdata.emit(this.dataSource.data);
      }
    });
  }

  removeFromArray(elementToBeDeleted: string) {
    const index: number = this.data.indexOf(elementToBeDeleted);
    if (index !== -1) {
      this.data.splice(index, 1); // remove element
      this.dataSource.data = this.data; // update table
    }
  }

  // Highlight row on edit click
  highlight(row: any) {
    this.selectedRowIndex = row.id;
  }

  // UI toast notifications
  // UI_notifications(status: string, message: string) {
  //   setTimeout(() => {
  //     /** spinner ends after 1 seconds */
  //     // this.spinner.hide();
  //     this.closeEdit('UI_notifications')
  //     // this.notifier.notify(status, message);
  //   }, 1000);

  // }

  /**
   * Fired only if user is in editing mode.
   * Go to new page if row index is grater than last row index displayed on page.
   * Check if next row index, based on selected pageSize, is less than the last row index displayed on page
   * I.E. If total length is 31 and the page size is 25 the last row index displayed is 6.
   *
   * If row index is valid set focus on the last clicked input, use timeout to leave angular the time to refresh page with the new input row.
   *
   * @param event
   */
  onEnter(event: any) {
    // console.log ('inizio onEnter', this.paginator);

    this.k = this.k + 1;
    // console.log ('inizio onEnter', this.k, this.paginator);

    /*
    if (this.paginator) {
      let currentPageLastRowIndex = 0;
      // console.log ('this.paginator.pageIndex', this.paginator.pageIndex, ' ', this.paginator.pageSize,  this.paginator.length);
      if (((this.paginator.pageIndex + 1) * this.paginator.pageSize) > this.paginator.length) {
        currentPageLastRowIndex = this.paginator.length - (this.paginator.pageIndex * this.paginator.pageSize);
      } else {
        currentPageLastRowIndex = this.paginator.pageSize;
      }

      // console.log ('currentPageLastRowIndex ==> ', currentPageLastRowIndex, ' k ', this.k);
      // console.log ('this.paginator.hasNextPage()', this.paginator.hasNextPage());

      if (this.k >= currentPageLastRowIndex) {
        if (this.paginator.hasNextPage()) {
          this.k = 0;
          // console.log ('invoke this.paginator.nextPage();');
          this.paginator.nextPage();
        } else {
          // console.log ('invoke this.exitEditMode();');
          this.exitEditMode();
        }
      }

    }
    */

    if (this.dataSource.paginator) {
      let currentPageLastRowIndex = 0;
      // console.log ('this.paginator.pageIndex', this.paginator.pageIndex, ' ', this.paginator.pageSize,  this.paginator.length);
      if (((this.dataSource.paginator.pageIndex + 1) * this.dataSource.paginator.pageSize) > this.dataSource.paginator.length) {
        currentPageLastRowIndex = this.dataSource.paginator.length - (this.dataSource.paginator.pageIndex * this.dataSource.paginator.pageSize);
      } else {
        currentPageLastRowIndex = this.dataSource.paginator.pageSize;
      }

      // console.log ('currentPageLastRowIndex ==> ', currentPageLastRowIndex, ' k ', this.k);
      // console.log ('this.paginator.hasNextPage()', this.paginator.hasNextPage());

      if (this.k >= currentPageLastRowIndex) {
        if (this.dataSource.paginator.hasNextPage()) {
          this.k = 0;
          // console.log ('invoke this.paginator.nextPage();');
          this.dataSource.paginator.nextPage();
        } else {
          // console.log ('invoke this.exitEditMode();');
          this.exitEditMode();
        }
      }

    }

    setTimeout( () => this.setFocus(this.selectedColumn), 500);

  }

  selectColumn(column: InLineEditField, columnIndex: number, rowIndex: number) {
    // console.log('selectColumn', column.id, 'columnIndex', columnIndex, 'rowIndex', rowIndex);
    if (column.editable) {
      this.selectedColumn = column.id + columnIndex;
      this.k = rowIndex;
      setTimeout(() => this.setFocus(this.selectedColumn), 500);
    }
  }

  private exitEditMode():  void {
    this.k = -1;
    this.selectedColumn = '';
  }

  private setFocus(elementId: string): void {
    // console.log('setFocus ', elementId);
    if (elementId) {
      // console.log('ok elementId');
      let element = document.getElementById(elementId);
      // console.log('setFocus elementId ', elementId, ' element ', element);
       if (element) {
         element.focus();
       }
    }
  }

  private defineNewRow(rowData: any): any {
    // console.log('defineNewRow', rowData);
    const row = {};
    this.newRowIndex = this.newRowIndex - 1;
    Object.defineProperty(row, 'id', {value: this.newRowIndex + '', writable: true});
    Object.defineProperty(row, 'operation', {value: TABLE_EDIT_ADDED, writable: true});
//    Object.defineProperty(row, 'status', {value: 'added', writable: true});
    // Loop di aggiunta colonne previste per ogni riga
    if (this.columns) {
      this.columns.forEach(column => {
        if (column.id !== 'id') {
          let valore = ' ';
          if (rowData) {
            // console.log('defineNewRow leggo valore da rowData per colonna', column.id);
            // console.log(' Object.keys(rowData)',  Object.keys(rowData));
            Object.keys(rowData).forEach(key => {
                // console.log ('key corrente', key);
                if (key === column.id) {
                  valore = rowData[key];
                }
            });
            // console.log('====> letto valore', valore);
          }
          Object.defineProperty(row, column.id, {value: valore, writable: true});
        }});

    }
    // console.log('colonne previste', this.columns);
    // console.log('nuovo oggetto creato', row);
    return row;
  }

  private copyRows(inputArray: any[], indexFrom: number, indexTo: number): any {
    // console.log('copyRows ', indexFrom, indexTo);
    if (this.data) {
      let oldArray: any[];
      oldArray = this.data;
      let riga = 0;
      oldArray.forEach(_arrayRow => {
        if (riga >= indexFrom && riga <= indexTo) {
          inputArray.push(_arrayRow);
        }
        riga++;
      });
    }
    // console.log('inputArray ', inputArray);
    return inputArray;
  }

  // Add new row
  addRow(indexRow: number, rowData: any) {
    // console.log('premuto addRow rowData ', rowData, 'indexRow ', indexRow);
    this.createNewData(indexRow, rowData);
    this.k = 0;
  }

  // Aggiunge una nuova riga in testa o dopo la riga da copiare
  createNewData(indexRow: number, rowData: any): any {
    // console.log('createNewData this.data corrente ', this.data);
    // console.log('createNewData', this.paginator.pageIndex, ' ', this.paginator.pageSize,  this.paginator.length);
    let currentPage = 0;
    let currentRowsXPage = 0;
    /*
    if (this.paginator) {
      currentPage = this.paginator.pageIndex;
      currentRowsXPage = this.paginator.pageSize;
    }
    */
    if (this.dataSource.paginator) {
      currentPage = this.dataSource.paginator.pageIndex;
      currentRowsXPage = this.dataSource.paginator.pageSize;
    }
    let row = this.defineNewRow(rowData);
    let newObject = new Array();
    if (indexRow === -1 && currentPage === 0) {
      // Inserimento nuova riga su prima pagina
      newObject.push(row);
      newObject = this.copyRows(newObject, 0, 999999999);
    } else {
        if (indexRow === -1 && currentPage > 0) {
        // Inserimento nuova riga su pagina diversa dalla prima
          let iArrivo = (currentPage * currentRowsXPage);
          newObject = this.copyRows(newObject, 0, iArrivo - 1);
          newObject.push(row);
          newObject = this.copyRows(newObject, iArrivo, 999999999);
        } else {
        // Inserimento nuova riga sotto riga corrente in pagina corretta
          let iArrivo = (currentPage * currentRowsXPage) + indexRow;
          newObject = this.copyRows(newObject, 0, iArrivo);
          newObject.push(row);
          newObject = this.copyRows(newObject, iArrivo + 1, 999999999);
      }
    }
    // console.log('fine createNewData newObject ', newObject);
    this.data = newObject;
    this.dataSource.data = this.data;
    return row;
    // console.log('NUOVI dati previsti', this.dataSource.data);
  }

  pageEvent($event: any) {
    console.log('pageEvent', $event);
  }

  fieldChange($event: any, i: number, rowData: any) {
    // console.log('fieldChange riga ', i, ' rowData ', rowData, ' event ', $event);
    this.doneEdit(rowData, i);
  }

  isSticky($column: any): boolean {
    // console.log('isSticky ', $column);
    if ($column && $column.sticky) {
      return true;
    }
    return false;
  }
}
