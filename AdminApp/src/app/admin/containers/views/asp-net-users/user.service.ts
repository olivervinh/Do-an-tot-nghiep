import { HttpClient } from "@angular/common/http";
import { Injectable, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { environment } from "../../../../../environments/environment";
import { User } from "./asp-net-users.component";
@Injectable({
    providedIn: 'root'
  })
export class UserService{
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSource = new MatTableDataSource<User>();
    user:User = new User()
    readonly url=environment.URL_API+"usermanagers"
    constructor(public http:HttpClient) { }
    get(){
      return this.http.get(this.url)
    }
    delete(id:number){
      return this.http.delete(`${this.url}/${id}`)
    }
    getAllUsers(){
      this.http.get(environment.URL_API+"usermanagers").subscribe(
        res=>{
          this.dataSource.data = res as User[];
        }
      )
    }
  }
