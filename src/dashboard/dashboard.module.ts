import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {AppDashboardComponent} from './dashboard.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { AppGettingdataComponent } from '../gettingdata/gettingdata.component';
import { TestTableComponent } from '../test-table/test-table.component';
import { GettingdataModule } from '../gettingdata/gettingdata.module';
import { TestTableModule } from '../test-table/test-table.module';



@NgModule({
  declarations: [AppDashboardComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    GettingdataModule,
    TestTableModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    RouterModule
  ],
  exports: [AppDashboardComponent]
})
export class AppDashboardModule {}
