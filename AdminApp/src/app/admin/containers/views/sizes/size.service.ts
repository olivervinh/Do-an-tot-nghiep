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
export class SizeService{
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSource = new MatTableDataSource<Size>();
    size:Size = new Size()
    constructor(public http:HttpClient) { }
    delete(id:number){
      return this.http.delete(`${environment.URL_API}sizes/${id}`)
    }
    gethttp():Observable<any>{
      return this.http.get(environment.URL_API+"sizes")
    }
    getAllSizes(){
      this.gethttp().subscribe(
        res=>{
          this.dataSource.data = res as Size[];
          console.log(this.dataSource.data)
        }
      )
    }
  }
  export class Size{
    id : number = 0
    tenSize : string
    id_Loai : number 
  }
  