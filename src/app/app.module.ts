import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route } from '@angular/router'
import { PubNubAngular } from 'pubnub-angular2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PostsService } from './posts.service';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogViewComponent } from './blog-view/blog-view.component';
import { TruncatePipe } from './truncate.pipe';
import { NewBlogComponent } from './new-blog/new-blog.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'posts',
    pathMatch: 'full'
  },
  {
    path: 'posts',
    component: BlogListComponent,
  },
  {
    path: 'posts/create',
    component: NewBlogComponent,
    pathMatch: 'full'
  },
  {
    path: 'posts/:id',
    component: BlogViewComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    BlogListComponent,
    BlogViewComponent,
    TruncatePipe,
    NewBlogComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [PubNubAngular, PostsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
