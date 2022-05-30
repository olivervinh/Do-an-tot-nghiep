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
export class TaoPhieuNhapService {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public dataSource = new MatTableDataSource<PhieuNhapNhaCungCap>();
  phieunhap:PhieuNhap = new PhieuNhap()
  sanpham:SanPham=new SanPham()
  phieunhapchange:PhieuNhapChange=new PhieuNhapChange()
  chitietphieunhap:ChiTietPhieuNhap=new ChiTietPhieuNhap()
  constructor(private http:HttpClient) { }
  phieunhappost:PostPhieuNhap=new PostPhieuNhap()
  idphieunhap:number
  getphieunhaphttp():Observable<any>{
    return this.http.get(environment.URL_API+"TaoPhieuNhaps")
  }
  getnhacungcaphttp():Observable<any>{
    return this.http.get(environment.URL_API+"NhaCungCaps")
  }
  getonenhacungcaphttp(data):Observable<any>{
    return this.http.post<any>(environment.URL_API+"TaoPhieuNhaps/NhaCungCap",data)
  }
  gettensanphamhttp(data):Observable<any>{
    return this.http.post(environment.URL_API+"TaoPhieuNhaps/SanPhamNhaCungCap",data)
  }
  gettensanphambienthehttp(data):Observable<any>{
    return this.http.post(environment.URL_API+"TaoPhieuNhaps/SanPhamBienTheMauSizeLoai",data)
  }
  getdetailphieunhap(id:number):Observable<any>{
    return this.http.get<any>(environment.URL_API+"TaoPhieuNhaps/"+id)
  }
  post(data):Observable<any>{
    return this.http.post(environment.URL_API+"TaoPhieuNhaps",data)
  }
  delete(id:number){
    return this.http.delete(`${environment.URL_API}/${id}`)
  }
  getAllPhieuNhaps(){
    this.getphieunhaphttp().subscribe(
      res=>{
        this.dataSource.data = res as PhieuNhapNhaCungCap[] ;
        console.log(this.dataSource.data);
      }
    )
  }
}
export class SanPham{
  id:number=0
  ten:string
  id_ncc:number
}
export class PhieuNhap{ 
  id:number=0
  nguoiLapPhieu:string
  chiTiets:Array<ChiTietPhieuNhap>
}
export class ChiTietPhieuNhap{
  id:number=0
  soLuongNhap:number=100
  id_SanPhamBienThe:number
  tenSanPhamBienThe:string
}
export class PhieuNhapChange{
  nhacungcap:any
  sanpham:any
  sanphambienthe:any
  idspbt:any
}
export class UploadChiTietPhieuNhapHang{
 GiaNhapSanPhamBienThe:number
 TenSanPhamBienThe:string
 SoluongNhap:number
}
export class PostPhieuNhap{
  nguoiLapPhieu:string
  ghiChu:string
  tongTien:number
  idNhaCungCap:string
  ChiTietPhieuNhaps:any=[]
}
export class PhieuNhapNhaCungCap{
 id:number 
 soChungTu:string 
 ngayTao :any
 tongTien :number
 ghiChu :string
 nguoiLapPhieu :string
 tenNhaCungCap :string
}
