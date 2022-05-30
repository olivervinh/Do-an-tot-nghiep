import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastServiceService } from '../../shared/toast-service.service';
import * as signalR from '@microsoft/signalr';
import { NhaCungCapComponent } from './nhacungcap/nhacungcap.component';
import { NhaCungCap, NhaCungCapService } from './nhacungcap.service';
@Component({
  selector: 'app-nhacungcaps',
  templateUrl: './nhacungcaps.component.html',
  styleUrls: ['./nhacungcaps.component.scss']
})
export class NhaCungCapsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  productList: any[];
  constructor(public service: NhaCungCapService,
    public router: Router,
    public http: HttpClient,
    public dialog: MatDialog,
    public serviceToast: ToastServiceService,) { }
  displayedColumns: string[] = ['id', 'ten', 'sdt', 'thongTin', 'diaChi',
    'actions'];
  ngOnInit(): void {
    this.service.getAllNhaCungCaps();
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
      this.service.getAllNhaCungCaps();
    });
  }
  ngAfterViewInit(): void {
    this.service.dataSource.sort = this.sort;
    this.service.dataSource.paginator = this.paginator;
  }
  onModalDialog() {
    this.service.nhacungcap = new NhaCungCap()
    this.dialog.open(NhaCungCapComponent)
  }
  doFilter = (value: string) => {
    this.service.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  populateForm(selectedRecord: NhaCungCap) {
    this.service.nhacungcap = Object.assign({}, selectedRecord)
    this.dialog.open(NhaCungCapComponent)
  }
  clickDelete(id) {
    if (confirm('Bạn có chắc chắn xóa bản ghi này không ??')) {
      this.service.delete(id).subscribe(
        res => {
          this.serviceToast.showToastXoaThanhCong()
          this.service.getAllNhaCungCaps()
        }, err => {
          this.serviceToast.showToastXoaThatBai()
        }
      )
    }
  }
}
