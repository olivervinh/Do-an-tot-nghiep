import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(public http: HttpClient) { }
  getlaytatcasanpham():Observable<any> {
    return this.http.get<any>("https://localhost:44302/api/sanphams/laytatcasanpham")
  }
  getsanphammoi():Observable<any>{
    return this.http.get<any>(" https://localhost:44302/api/sanphams/topsanphammoi")
  }
  public trangthaiDataProduct:boolean
}
