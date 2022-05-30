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
export class MauSacService{
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSource = new MatTableDataSource<MauSac>();
    mausac:MauSac = new MauSac()
    tensizeloai: any
    constructor(public http:HttpClient) { }
    delete(id:number):Observable<any>{
      return this.http.delete<any>(`${environment.URL_API+"mausacs"}/${id}`)
    }
    getMauSac():Observable<any>{
      return this.http.get<any>(environment.URL_API+"mausacs")
    }
    /* Dùng cho component Product sau khi thêm hoặc sửa xong */
    getAllMauSacs(){
      this.getMauSac().subscribe(
        res=>{
          this.dataSource.data = res as MauSac[];
        }
      )
    }
  }
  export class MauSac{
    id: number = 0
    maMau : string
    id_Loai : number
  }
  export class User{
    id : string
    ImagePath:string
    imagePath: string
    userName:string
    lastName:string
    firstName:string
    quyen:string
  }
  export class MauSacLoai{
  }