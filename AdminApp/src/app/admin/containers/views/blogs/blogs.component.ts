import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Blog, BlogService } from './blog.service';
import { BlogComponent } from './blog/blog.component';
import * as signalR from '@microsoft/signalr';
@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    public service:BlogService,
    public router : Router,
    public http: HttpClient,
    public dialog: MatDialog,
    public toastr: ToastrService,
            ) { }
   displayedColumns: string[] = ['id', 'tieude', 'hinh','noidung','actions'];
   public blog : Blog 
  ngOnInit(): void {
    this.service.getAllBlogs()
    const connection = new signalR.HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.Information)
    .withUrl('https://localhost:44302/notify')
    .build();
  connection.start().then(function () {
    console.log('SignalR Connected!');
  }).catch(function (err) {
    return console.error(err.toString());
  });
  connection.on("BroadcastMessage", () => {
    this.service.getAllBlogs()
  });
  }
  ngAfterViewInit(): void {
    this.service.dataSource.sort = this.sort;
    this.service.dataSource.paginator = this.paginator;
  }
  onModalDialog(){
    this.service.blog = new Blog()
    this.dialog.open(BlogComponent)
  }
 doFilter = (value: string) => {
  this.service.dataSource.filter = value.trim().toLocaleLowerCase();
}
showToastXoaThanhCong(){
  this.toastr.success("Xóa thành công")
}
showToastXoaThatBai(){
  this.toastr.error("Xóa thất bại")
}
  populateForm(selectedRecord:Blog){
    this.service.blog = Object.assign({},selectedRecord)
    this.dialog.open(BlogComponent)
    console.log(selectedRecord)
}
  clickDelete(id){
  if(confirm('Bạn có chắc chắn xóa bản ghi này không ??'))
  {
    this.service.delete(id).subscribe(
      res=>{
        this.service.getAllBlogs()
        this.showToastXoaThanhCong()
      }
      ,err=>{
        this.showToastXoaThatBai()
      }
    )
}
}}