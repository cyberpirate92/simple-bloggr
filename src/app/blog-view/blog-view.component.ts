import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService, BlogPost } from '../posts.service';

@Component({
    selector: 'app-blog-view',
    templateUrl: './blog-view.component.html',
    styleUrls: ['./blog-view.component.css']
})
export class BlogViewComponent implements OnInit {

    public postId: number;
    public blogPost: BlogPost;
    public showFailureAlert: boolean = false;

    constructor(private activatedRoute: ActivatedRoute, 
        private postsService: PostsService,
        private router: Router) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(routeParams => {
            if (routeParams) {
                this.postId = parseInt(routeParams['id']);
                if (this.postId >= 0)
                    this.blogPost = this.postsService.getPost(this.postId);
            }
        })
    }

    public deletePost(): void {
        this.showFailureAlert = false;
        this.postsService.deletePost(this.postId).subscribe((result: boolean) => {
            this.router.navigate(["/"]);
        }, (error: any) => {
            this.showFailureAlert = true;
        });
    }
}
