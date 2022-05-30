import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { ToastServiceService } from '../../shared/toast-service.service';
import { options } from 'fusioncharts';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private http: HttpClient) { } //Giao tiep 2 commponent thong qua service
  getCountProduct(): Observable<number> {
    return this.http.get<number>(environment.URL_API + "ThongKeSoLuongs/countproduct")
  }
  getCountOrder(): Observable<number> {
    return this.http.get<number>(environment.URL_API + "ThongKeSoLuongs/countorder")
  }
  getCountUser(): Observable<number> {
    return this.http.get<number>(environment.URL_API + "ThongKeSoLuongs/countuser")
  }
  getCountTotalMoney(): Observable<number> {
    return this.http.get<number>(environment.URL_API + "ThongKeSoLuongs/countmoney")
  }
  getTopDataSetBanRaTonKho():Observable<any>{
    return this.http.get<any>(environment.URL_API+"ThongKeBieuDos/topdatasetbanratonkho") 
 }
}
