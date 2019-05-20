import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppGettingdataComponent } from './gettingdata.component';
import { PostService } from '../services/post.service';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule, MatFormFieldModule} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';



@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule
  ],
  declarations: [AppGettingdataComponent],
  providers: [PostService],
  exports: [AppGettingdataComponent]
})
export class GettingdataModule { }
