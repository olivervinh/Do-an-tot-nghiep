import { HttpClient } from '@angular/common/http';
import { Injectable, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Category } from '../categories/category.service';
@Injectable({
  providedIn: 'root'
})
export class DiscountCodeService {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSource = new MatTableDataSource<DiscountCode>();
    magiamgia : DiscountCode = new DiscountCode()
    constructor(public http:HttpClient) { }
    delete(id:number){
      return this.http.delete(`${environment.URL_API+"magiamgias"}/${id}`)
    }
    get():Observable<any>{
      return this.http.get<any>(environment.URL_API+"magiamgias")
    }
    getAllMaGiamGias(){
      this.get().subscribe(
        res=>{
          this.dataSource.data = res as DiscountCode[];
        }
      )
    }
  }
  export class DiscountCode{
    id : number = 0
   code:string
   soTienGiam:string
  }
  