import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastServiceService } from '../../shared/toast-service.service';
import { MauSac, MauSacService } from './mau-sac.service';
import { MauSacComponent } from './mau-sac/mau-sac.component';
import * as signalR from '@microsoft/signalr';
@Component({
  selector: 'app-mau-sacs',
  templateUrl: './mau-sacs.component.html',
  styleUrls: ['./mau-sacs.component.scss']
})
export class MauSacsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  productList: any[];
  constructor(public service:MauSacService,
              public router : Router,
              public http: HttpClient,
              public dialog: MatDialog,
              public serviceToast : ToastServiceService,) { }
displayedColumns: string[] = ['id', 'maMau','tenLoai',
  'actions'];
  ngOnInit(): void {
    this.service.getAllMauSacs();
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
    this.service.getAllMauSacs();
  });
  }
  ngAfterViewInit(): void {
    this.service.dataSource.sort = this.sort;
    this.service.dataSource.paginator = this.paginator;
  }
  onModalDialog(){
    this.service.mausac = new MauSac()
    this.dialog.open(MauSacComponent)
  }
 doFilter = (value: string) => {
  this.service.dataSource.filter = value.trim().toLocaleLowerCase();
}
  populateForm(selectedRecord:MauSac){
    this.service.mausac = Object.assign({},selectedRecord)
    this.dialog.open(MauSacComponent)
}
  clickDelete(id){
  if(confirm('Bạn có chắc chắn xóa bản ghi này không ??'))
  {
    this.service.delete(id).subscribe(
      res=>{
        this.service.getAllMauSacs()
        this.serviceToast.showToastXoaThanhCong()
      },err=>{
        this.serviceToast.showToastXoaThatBai()
      }
    )
}
}}
