import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route } from '@angular/router'
import { PubNubAngular } from 'pubnub-angular2';

import { AppComponent } from './app.component';
import { PostsService } from './posts.service';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogViewComponent } from './blog-view/blog-view.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'posts'
  },
  {
    path: 'posts',
    component: BlogListComponent,
    pathMatch: 'full'
  },
  {
    
  }
];

@NgModule({
  declarations: [
    AppComponent,
    BlogListComponent,
    BlogViewComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { enableTracing: true })
  ],
  providers: [PubNubAngular, PostsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
