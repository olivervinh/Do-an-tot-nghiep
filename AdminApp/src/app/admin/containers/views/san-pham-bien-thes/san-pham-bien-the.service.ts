import { HttpClient } from "@angular/common/http";
import { Injectable, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Observable } from "rxjs";
import { environment } from "../../../../../environments/environment";
@Injectable({
    providedIn: 'root'
  })
export class SanPhamBienTheService{
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSource = new MatTableDataSource<GiaSanPhamMauSacSanPhamSize>();
    sanphambienthe:GiaSanPhamMauSacSanPhamSize = new GiaSanPhamMauSacSanPhamSize()
    readonly url=environment.URL_API+"sanphambienthes"
    constructor(public http:HttpClient) { }
    delete(id:number):Observable<any>{
      return this.http.delete<any>(`${this.url}/${id}`)
    }
    gethttp():Observable<any>{
      return this.http.get(environment.URL_API+"sanphambienthes")
    }
    getAllGiaSanPhamMauSacSanPhamSizes(){
      this.gethttp().subscribe(
        res=>{
          this.dataSource.data = res as GiaSanPhamMauSacSanPhamSize[];
          console.log(this.dataSource.data)
        }
      )
    }
    /* Dùng cho component modal thêm xóa sửa */
    getAllSanPhams(){
      return this.http.get(environment.URL_API+"sanphams")
    }
    getAllTenSizeLoai(){
      return this.http.get(environment.URL_API+"sizes/tensizeloai")
    }
    getAllTenMauLoai(){
      return this.http.get(environment.URL_API+"mausacs/tenmauloai")
    }
  }
  export class LoaiMau{
    loaiTenMau: string
  }
  export class SanPhamBienThe{
    id : number = 0
    mauId : number 
    sanPhamId : number
    sizeId : number
    soLuongTon:number =0
  }
  export class GiaSanPhamMauSacSanPhamSize{
    id : number
    maMau : string
    tenSize :string
    tenSanPham :string
    id_Mau : number 
    id_SanPham : number
    id_Size : number
    soLuongTon : number
  }