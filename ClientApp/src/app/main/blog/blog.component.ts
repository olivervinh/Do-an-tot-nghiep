import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  public listblog:any;
  constructor(public http:HttpClient) {
    this.http.post("https://localhost:44302/api/blogs/getBlog/",{}
  ).subscribe(
    res=>{
      this.listblog=res;
  })
  }
  ngOnInit(): void {
  }

}
