import { Component, OnInit } from '@angular/core';
import { PostsService, BlogPost } from '../posts.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  constructor(public blogPostService: PostsService) { }

  ngOnInit() {
    this.blogPostService.refresh();
  }
}
