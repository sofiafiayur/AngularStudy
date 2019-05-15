import { Http, Response, HttpModule } from '@angular/http';
import { Component, Input, OnInit } from '@angular/core';
import { PostService } from './../services/post.service';

@Component({
  selector: 'app-gettingdata',
  templateUrl: './gettingdata.component.html',
  styleUrls: ['./gettingdata.component.css']
})
export class AppGettingdataComponent implements OnInit {
  posts: any[];

  ngOnInit(): void {
    this.service.getPost().subscribe((response: any) => {
          // console.log(Response.json());
           this.posts = response.json();
    });
  }

  constructor(private service: PostService) {

  }

  createPost(input: HTMLInputElement) {
    if (input) {
      const posts = { title: input.value };
      this.service.createPost(posts).subscribe(
        response => {
          // this.posts = Response.json();
          // let post = { title: input.value };
          posts['id'] = response.json().id;
          // console.log(Response.json());
          this.posts.splice(0, 0, posts);
        },
        error => {
            alert('An unexpected error occurred.');
            console.log(error);
      });
    }

  }


  updatePost(post: any)  {
    if (post) {
      this.service.updatePost(post).subscribe(
        (response: any) => {
          console.log(response.json());
        },
        ( error: any ) => {
          if (error.status === 400) {
            // this.form.setErrors(error.json())
          } else {alert ('An unexpected error occurred');
            console.log(error);
          }
        }
      );
    }
    //this.http.put(this.url, JSON.stringify({ post }))
  }
  deletePost(post: any) {
    try {
      this.service.deletePost(post.id).subscribe(
        response => {
          let index = this.posts.indexOf(post);
            this.posts.splice(index,1);
        });
  /*       (error: Response) => {
          if (error.status === 404)
            alert('This post has already been deleted.');
          else{
            alert('An unexpected error occurred.');
            console.log(error);
          }
        }   
   */              
    } catch (error) {
      console.error(error);
    }

    
  }
  

}
