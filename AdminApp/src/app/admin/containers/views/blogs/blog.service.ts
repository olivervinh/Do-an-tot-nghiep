import { HttpClient } from '@angular/common/http';
import { Injectable, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BlogService {
  @ViewChild(MatSort) sort: MatSort;  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSource = new MatTableDataSource<Blog>();
    blog:Blog = new Blog()
    constructor(public http:HttpClient) { }
    get():Observable<any>{
      return this.http.get(environment.URL_API+"blogs")
    }
    delete(id:number){
      return this.http.delete(`${environment.URL_API+"blogs"}/${id}`)
    }
    post(blog: any): Observable<any> {
      return this.http.post<any>(environment.URL_API + 'blogs', blog)
    }
    put( id: number,blog: any): Observable<any> {
      return this.http.put<any>(environment.URL_API + 'blogs/' + id, blog)
    }
    getAllBlogs(){
      this.get().subscribe(
        res=>{
          this.dataSource.data = res as Blog[];
          console.log((res))
        }
      )
    }
}
export class Blog{
  id:number = 0
  tieude:string
  hinh:string
  noidung:string
}
