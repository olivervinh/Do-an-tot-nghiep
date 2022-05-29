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
  public dataSource = new MatTableDataSource<SanPhamBienTheTenLoai>();
    sanphambienthe:SanPhamBienThe = new SanPhamBienThe()
    spbts: SanPhamBienThe[]
    tensizeloai:any
    readonly url=environment.URL_API+"sanphambienthes"
    constructor(public http:HttpClient) { }

    delete(id:number):Observable<any>{
      return this.http.delete<any>(`${this.url}/${id}`)
    }
    gethttp():Observable<any>{
      return this.http.get(environment.URL_API+"sanphambienthes/sanphambienthe")
    }
    getAllSanPhamBienTheTenLoais(){
      this.gethttp().subscribe(
        res=>{
          this.dataSource.data = res as SanPhamBienTheTenLoai[];
        }
      )
    }
    /* Dùng cho component modal thêm xóa sửa */
    getAllSanPhams(){
      return this.http.get(environment.URL_API+"sanphams/sp")
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
  
  export class SanPhamBienTheTenLoai{
    id : number
    mauLoai : string
    sizeLoai :string
    sanPham :string
  }