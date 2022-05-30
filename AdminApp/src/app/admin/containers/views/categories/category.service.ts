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
export class CategoryService{
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSource = new MatTableDataSource<Category>();
    category:Category = new Category()
    constructor(public http:HttpClient) { }
    delete(id:number){
      return this.http.delete(`${environment.URL_API+"loais"}/${id}`)
    }
    get():Observable<any>{
      return this.http.get<any>(environment.URL_API+"loais")
    }
    getAllCategories(){
      this.get().subscribe(
        res=>{
          this.dataSource.data = res as Category[];
        }
      )
    }
  }
  export class Category{
    id : number = 0
    ten : string
    imagePath : string 
  }
  