import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostsService } from '../posts.service';

@Component({
    selector: 'app-new-blog',
    templateUrl: './new-blog.component.html',
    styleUrls: ['./new-blog.component.css']
})
export class NewBlogComponent {

    public blogPostForm: FormGroup;

    // flags to show alert messages
    public showSuccessAlert: boolean = false;
    public showFailureAlert: boolean = false;

    constructor(private postsService: PostsService) {
        let formBuilder: FormBuilder = new FormBuilder();
        this.blogPostForm = formBuilder.group({
            title: ['', Validators.required],
            body: ['', Validators.required]
        })
    }

    public onSubmit(): void {

        // resetting alert message flags
        this.showFailureAlert = false;
        this.showSuccessAlert = false;

        this.postsService.createPost(this.blogPostForm.value, (status, response) => {
            if (status.error) {
                console.log(status);
                this.showFailureAlert = true;
            } else {
                this.postsService.refresh();
                this.showSuccessAlert = true;
                setTimeout(() => this.showSuccessAlert = false, 3000);
            }
        });
    }
}
