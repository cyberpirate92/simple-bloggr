import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.css']
})
export class BlogViewComponent implements OnInit {

  constructor(private activatedRouteSnapshot: ActivatedRouteSnapshot) { 
    console.log('Data --- ');
    console.log(activatedRouteSnapshot.data);
  }

  ngOnInit() {
  }

}
