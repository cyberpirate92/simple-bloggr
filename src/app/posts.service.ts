import { Injectable } from '@angular/core';
import { PubNubAngular } from 'pubnub-angular2';
import { BehaviorSubject } from 'rxjs/Rx';
import { DummyPosts } from './blog-list/dummy';

@Injectable()
export class PostsService {
  public blogPosts$: BehaviorSubject<BlogPost[]> = new BehaviorSubject([]);

  constructor(private _pubnub: PubNubAngular) {
    this._pubnub.init({
      publishKey: 'pub-c-39edde4e-8b20-423c-8c86-c6234cfa62dd',
      subscribeKey: 'sub-c-b15cdf5a-3101-11e8-9ead-7a5cdad760ea'
    });
    this.getPosts();
  }

  public createPost(title: string, body: string) {
    let request: any = { message: {} };
    let blogPost: BlogPost = {
      userId: 10,
      title: title,
      body: body,
      id: this.blogPosts$.value.length
    };

    request.message = blogPost;
    this._pubnub.publish(request, (status, response) => {
      if (status.error) {
        console.log(status);
      } else {
        console.log('message Published w/ timetoken', response.timetoken);
      }
    });
  }

  // TODO: make it async
  public getPosts(): void {
    this.blogPosts$.next(DummyPosts);
  } 
}

export interface BlogPost {
  id?: number;
  userId: number;
  title: string;
  body: string;
}