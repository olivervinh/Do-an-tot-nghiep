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
export class BrandService{
  @ViewChild(MatSort) sort: MatSort;  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSource = new MatTableDataSource<Brand>();
    brand:Brand = new Brand()
    constructor(public http:HttpClient) { }
    get():Observable<any>{
      return this.http.get(environment.URL_API+"nhanhieus")
    }
    delete(id:number){
      return this.http.delete(`${environment.URL_API+"nhanhieus"}/${id}`)
    }
    getAllBrands(){
      this.get().subscribe(
        res=>{
          this.dataSource.data = res as Brand[];
        }
      )
    }
  }
  export class Brand{
    id : number = 0
    ten : string
    thongTin : string 
    imagePath : string 
  }
  