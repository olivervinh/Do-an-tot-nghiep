import { Injectable, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSource = new MatTableDataSource<Product>();
  constructor(public http: HttpClient) { }
  product: Product = new Product();
  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.URL_API + "sanphams"}/${id}`)
  }
  get(): Observable<any> {
    return this.http.get<any>(environment.URL_API + "sanphams")
  }
  getAllProducts() {
    return this.get().subscribe(res => {
      this.dataSource.data = res as Product[]
    })
  }
  //
  post(product: any): Observable<any> {
    return this.http.post<any>(environment.URL_API + 'sanphams', product)
  }
  put( id: number,product: any): Observable<any> {
    return this.http.put<any>(environment.URL_API + 'sanphams/' + id, product)
  }
  putHoatDong(id: number,element:Product):Observable<any>{
    return this.http.put<any>(environment.URL_API + 'sanphams/capnhattrangthaihoatdong/' + id,element)
  }
}
export class Product {
  id: number = 0
  ten: string
  khuyenMai: number =0
  moTa: string
  khoiLuong: number
  giaBan: number
  giaNhap:number
  gioiTinh:number
  tag: string
  huongDan: string
  thanhPhan: string
  trangThaiSanPham: string
  trangThaiHoatDong: boolean
  trangThaiSanPhamThietKe: string
  id_NhanHieu: number
  id_Loai: number
  id_NhaCungCap:number
  giaSanPhams: number
  sanPhamThietKes: number
  sanPham_SanPhamThietKe: number
  tenNhanHieu: string
  tenLoai: string
  soLuongLike:number
  soLuongComment:number
}
