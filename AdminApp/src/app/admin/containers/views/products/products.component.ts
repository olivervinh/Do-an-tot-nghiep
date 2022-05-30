import { Component, OnInit } from '@angular/core'
import { Product, ProductService } from './product.service'
import * as signalR from '@microsoft/signalr';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ImagesmodelComponent } from './imagesmodel/imagesmodel.component';
import { MatAccordion } from '@angular/material/expansion';
import { ToastServiceService } from '../../shared/toast-service.service';
import { SanPhamBienTheService } from '../san-pham-bien-thes/san-pham-bien-the.service';
import { environment } from '../../../../../environments/environment';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public servicespbt: SanPhamBienTheService,
    public service: ProductService,
    private breakpointObserver: BreakpointObserver,
    public router: Router,
    public http: HttpClient,
    public dialog: MatDialog,
    public serviceToast: ToastServiceService,) { }
  displayedColumns: string[] = ['id', 'ten', 'hinh',
    'gia',
    'giaNhap',
    'trangThaiSanPham',
    'trangThaiHoatDong',
    'tenNhanHieu',
    'tenLoai',
    'like',
    'comment',
    'toggle',
    'actions'
     ];
  updateActiveStatus(element:Product) {
    console.log("element là: ",element);
      console.log("element.trangThaiHoatDong là: ",element.trangThaiHoatDong);
      this.service.putHoatDong(element.id,element).subscribe(
        result=>{
          this.service.getAllProducts()
        },
        error=>{
          console.log(error);
        }
      )
    }
  ngOnInit() {
    this.service.getAllProducts();
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
      this.service.getAllProducts();
    });
  }
  ngAfterViewInit(): void {
    this.service.dataSource.sort = this.sort;
    this.service.dataSource.paginator = this.paginator;
  }
  public doFilter = (value: string) => {
    this.service.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  onSelectedAdd() {
    this.service.product = new Product();
    this.router.navigate(['admin/product/add']);
  }
  onselectedDetail() {
    this.router.navigate(['admin/product/detail/' + this.service.product.id]);
  }
  exportGeneratePdf() {
    window.open("https://localhost:44302/api/GeneratePdf/allsanpham", "_blank");
  }
  onSelectedEdit() {
    this.router.navigate(['admin/product/edit/' + this.service.product.id]);
  }
  detail(selectedRecord: Product) {
    this.service.product = Object.assign({}, selectedRecord)
    this.onselectedDetail()
  }
  populateForm(selectedRecord: Product) {
    this.service.product = Object.assign({}, selectedRecord)
    this.onSelectedEdit();
  }
  clickDelete(id) {
    if (confirm('Bạn có chắc chắn xóa bản ghi này không ??')) {
      this.service.delete(id).subscribe(
        res => {
          this.service.getAllProducts()
          this.serviceToast.showToastXoaThanhCong()
        }
        , err => {
          this.serviceToast.showToastXoaThatBai()
        }
      )
    }
  }
}