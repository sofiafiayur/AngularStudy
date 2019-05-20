import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AppInputInlineComponent, TestTableComponent} from './test-table.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatTableEditModule } from '../mat-table-edit/mat-table-edit.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

const routes: Routes = [
  {
    path: 'dashboard/table-edit',
    component: TestTableComponent
  },
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatTableEditModule
  ],
  entryComponents: [
    AppInputInlineComponent
  ],
  declarations: [AppInputInlineComponent, TestTableComponent],
  exports: [TestTableComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestTableModule { }
