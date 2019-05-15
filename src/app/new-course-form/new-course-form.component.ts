import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'new-course-form',
  templateUrl: './new-course-form.component.html',
  styleUrls: ['./new-course-form.component.css']
})
export class NewCourseFormComponent implements OnInit {
  categories = [
    {id:1, name:'Development'},
    {id:2, name:'Art'},
    {id:3, name:'Languages'},
  ];

  
  
  ngOnInit() {
    console.log(this.categories);

  }
  constructor() { }
  
  submit(course){
    console.log(course);
  }
}
