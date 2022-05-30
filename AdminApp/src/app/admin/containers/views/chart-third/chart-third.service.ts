import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ChartThirdService {
  constructor(private http:HttpClient) { }
  getSoLuongTonService():Observable<any>{
    return this.http.get<any>(environment.URL_API+"ThongKeSoLuongs/soluongton")
  }
  getNhaCungCapTongTienService():Observable<any>{
    return this.http.get<any>(environment.URL_API+"ThongKeBieuDos/nhacungcaptongtien")
  }
  getNhaCungCapSoLuongService():Observable<any>{
    return this.http.get<any>(environment.URL_API+"ThongKeBieuDos/nhacungcapsoluong")
  }
}
