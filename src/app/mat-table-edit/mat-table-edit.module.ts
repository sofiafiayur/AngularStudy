import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSortModule} from '@angular/material/sort';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppDialogComponent} from './app-dialog/app-dialog.component';
import {MatTableEditComponent} from './mat-table-edit.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatDatepickerWrapperComponent } from './mat-datepicker-wrapper/mat-datepicker-wrapper.component';
import { MatDatepickerWrapperMmyyyyComponent } from './mat-datepicker-wrapper-mmyyyy/mat-datepicker-wrapper-mmyyyy.component';
import { MatToolbarModule } from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatAutocompleteModule,
    MatButtonModule,
//    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
//    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
    MatToolbarModule,
    ReactiveFormsModule
  ],
  entryComponents: [AppDialogComponent],
  declarations: [AppDialogComponent, MatTableEditComponent, MatDatepickerWrapperComponent, MatDatepickerWrapperMmyyyyComponent],
  exports: [ MatTableEditComponent],
  providers: [
  ],
})
export class MatTableEditModule { }
