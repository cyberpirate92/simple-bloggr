import { Injectable } from '@angular/core';
import { PubNubAngular } from 'pubnub-angular2';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class PostsService {
    // delegates
    public blogPosts$: BehaviorSubject<BlogPost[]> = new BehaviorSubject([]);
    public totalPosts$: BehaviorSubject<number> = new BehaviorSubject(0);

    // for paging
    public maxPostsPerPage: number = 3;
    public currentIndex: number = 0;

    // constants
    public readonly API_GET_URL = "https://pubsub.pubnub.com/v1/blocks/sub-key/sub-c-b15cdf5a-3101-11e8-9ead-7a5cdad760ea/posts";
    public readonly API_DELETE_URL = "https://pubsub.pubnub.com/v1/blocks/sub-key/sub-c-b15cdf5a-3101-11e8-9ead-7a5cdad760ea/delete";
    public readonly PUBNUB_CHANNEL = "posts";

    constructor(private _pubnub: PubNubAngular, private http: HttpClient) {
        this._pubnub.init({
            publishKey: 'pub-c-39edde4e-8b20-423c-8c86-c6234cfa62dd',
            subscribeKey: 'sub-c-b15cdf5a-3101-11e8-9ead-7a5cdad760ea'
        });
        this.refresh();
    }

    public createPost(blogPost: BlogPost, callbackFn: (status, response) => any) {
        let request: any = { message: {}, channel: this.PUBNUB_CHANNEL };

        blogPost.userId = 0;
        request.message = blogPost;

        this._pubnub.publish(request, callbackFn);
    }

    public loadNextPage(): void {
        let maxId = 0;
        this.blogPosts$.value.forEach((post: BlogPost) => {
            maxId = post.id > maxId ? post.id : maxId;
        });
        if (maxId > this.currentIndex && maxId <= this.totalPosts$.value) {
            this.currentIndex = maxId;
            this.refresh();
        }
    }

    public loadPreviousPage(): void {
        let minId = this.currentIndex >= this.maxPostsPerPage ? this.currentIndex - this.maxPostsPerPage : 0;
        if (minId >= 0) {
            this.currentIndex = minId;
            this.refresh();
        }
    }

    public refresh(): void {
        this.http.get<GetBlogsResponse>(this.API_GET_URL, {
            params: new HttpParams()
                .set('_start', `${this.currentIndex}`)
                .set('_limit', `${this.maxPostsPerPage}`)
        }).subscribe((response: GetBlogsResponse) => {
            this.blogPosts$.next(response.posts);
            this.totalPosts$.next(response.totalCount);
        });
    }

    public getPost(postId: number): BlogPost {
        let posts = this.blogPosts$.value;
        let post = null;
        if (posts)
            post = posts.find(p => p.id === postId);
        return post ? post : null;
    }

    public deletePost(postId: number): Observable<any> {
        return this.http.delete(this.API_DELETE_URL, {
            params: new HttpParams().set("id", `${postId}`)
        });
    }
}

export interface BlogPost {
    id?: number;
    userId?: number;
    title: string;
    body: string;
}

export interface GetBlogsResponse {
    posts: BlogPost[];
    totalCount: number;
}