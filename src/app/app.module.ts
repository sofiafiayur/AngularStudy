import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthorsComponent } from './authors/authors.component';
import { AuthorsService } from './authors.service';
import { CoursesComponent } from './courses.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FavoriteComponent } from './favorite/favorite.component';
import { NewCourseFormComponent } from './new-course-form/new-course-form.component';
import { AppGettingdataComponent } from './gettingdata/gettingdata.component';
import { PostService } from './services/post.service';
import { HttpModule } from '@angular/http';
// import 'rxjs/add/operator/catch';

@NgModule({
  declarations: [
    AppComponent,
    AuthorsComponent,
    CoursesComponent,
    FavoriteComponent,
    // NewCourseFormComponent,
    AppGettingdataComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [AuthorsService, PostService],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
