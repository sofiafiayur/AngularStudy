import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';



@Injectable()/*  ({
  providedIn: 'root'
}) */
export class PostService {
  private url = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: Http ) { }

  getPost() {
  return this.http.get( this.url );
  }

  createPost (post: any) {
    return this.http.post(this.url, JSON.stringify(post));
  }

  updatePost (post: any) {
    return this.http.patch(this.url + '/' + post.id, JSON.stringify({ isRead: true }));
  }

  deletePost (id: any) {
    return this.http.delete(this.url + '/' + id);
  }
}
