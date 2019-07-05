import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthorsComponent } from './authors/authors.component';
import { AuthorsService } from './authors.service';
import { CoursesComponent } from './courses.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FavoriteComponent } from './favorite/favorite.component';
import { NewCourseFormComponent } from './new-course-form/new-course-form.component';
import { PostService } from './services/post.service';
import { HttpModule, Http } from '@angular/http';
import {GettingdataModule} from './gettingdata/gettingdata.module';
import { AppDashboardComponent } from './dashboard/dashboard.component';
import { AppDashboardModule } from './dashboard/dashboard.module';
import { RouterModule } from '@angular/router';
import { AppGettingdataComponent } from './gettingdata/gettingdata.component';
import { TestTableComponent } from './test-table/test-table.component';
// import 'rxjs/add/operator/catch';

@NgModule({
  declarations: [
    AppComponent,
    AuthorsComponent,
    CoursesComponent,
    FavoriteComponent,
    NewCourseFormComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    GettingdataModule,
    AppDashboardModule,
    HttpModule,
    RouterModule.forRoot([
      /* {
        path: '',
        component: AppDashboardComponent
      }, */
      {
        path: 'todolist',
        component: AppGettingdataComponent
      },
      {
        path: 'userdata_table',
        component: TestTableComponent
      },
      {
        path: 'new-course-form',
        component: NewCourseFormComponent
      },
      /* {
        path: '**',
        component: AppDashboardComponent
      } */
    ])
  ],
  providers: [AuthorsService, PostService],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
