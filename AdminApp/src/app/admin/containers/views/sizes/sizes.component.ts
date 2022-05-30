import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastServiceService } from '../../shared/toast-service.service';
import {  Size, SizeService } from './size.service';
import * as signalR from '@microsoft/signalr';
import { SizeComponent } from './size/size.component';
@Component({
  selector: 'app-sizes',
  templateUrl: './sizes.component.html',
  styleUrls: ['./sizes.component.scss']
})
export class SizesComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  productList: any[];
  constructor(public service:SizeService,
              public router : Router,
              public http: HttpClient,
              public dialog: MatDialog,
              public serviceToast : ToastServiceService,) { }
displayedColumns: string[] = ['id', 'tenSize','tenLoai',
  'actions'];
  ngOnInit(): void {
    this.service.getAllSizes();
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
    this.service.getAllSizes();
  });
  }
  ngAfterViewInit(): void {
    this.service.dataSource.sort = this.sort;
    this.service.dataSource.paginator = this.paginator;
  }
  onModalDialog(){
    this.service.size = new Size()
    this.dialog.open(SizeComponent)
  }
 doFilter = (value: string) => {
  this.service.dataSource.filter = value.trim().toLocaleLowerCase();
 }
  populateForm(selectedRecord:Size){
    this.service.size = Object.assign({},selectedRecord)
    this.dialog.open(SizeComponent)
}
  clickDelete(id){
  if(confirm('Bạn có chắc chắn xóa bản ghi này không ??'))
  {
    this.service.delete(id).subscribe(
      res=>{
        this.serviceToast.showToastXoaThanhCong()
        this.service.getAllSizes()
      },err=>{
        this.serviceToast.showToastXoaThatBai()
      }
    )
}
}}
