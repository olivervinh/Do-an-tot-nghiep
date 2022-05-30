import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../../../../environments/environment';
import { ToastServiceService } from '../../../shared/toast-service.service';
import { TaoPhieuNhapService, UploadChiTietPhieuNhapHang } from '../tao-phieu-nhap.service';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tao-phieu-nhap',
  templateUrl: './tao-phieu-nhap.component.html',
  styleUrls: ['./tao-phieu-nhap.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  }]
})
export class TaoPhieuNhapComponent implements OnInit {
  constructor(public service: TaoPhieuNhapService,
    private http: HttpClient,
    private route: Router,
    private serviceToast: ToastServiceService,
    private _formBuilder: FormBuilder
  ) { }
  chitiets: any=[]
  nhacungcaps: any[] = [];
  sanphams: any[] = [];
  sanphambienthes: any[] = [];
  motnhacungcap:any
  idUser:any
  ngOnInit(): void {
    this.service.getnhacungcaphttp().subscribe(
      data => {
        Object.assign(this.nhacungcaps, data)
      }
    )
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: []
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: []
    });
    this.newFormGroupChiTiet = new FormGroup({
      GiaNhapSanPhamBienThe: new FormControl(null,
        [
        ]),
      TenSanPhamBienThe: new FormControl(null,
        [
          Validators.required
        ]),
      SoLuongNhap: new FormControl(100,
        [
          Validators.required,
        ]),
    });
    this.newFormGroupPhieuNhap = new FormGroup({
      GhiChu: new FormControl(null,
        [
          Validators.required,
        ]),
    })
  }
  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;
  public newFormGroupChiTiet: FormGroup;
  public newFormGroupPhieuNhap: FormGroup;
  get TenSanPhamBienThe() { return this.newFormGroupChiTiet.get('TenSanPhamBienThe'); }
  get SoLuongNhap() { return this.newFormGroupChiTiet.get('SoLuongNhap'); }
  get GiaNhapSanPhamBienThe() { return this.newFormGroupChiTiet.get('GiaNhapSanPhamBienThe'); }
  get GhiChu() { return this.newFormGroupPhieuNhap.get('GhiChu'); }
  GiaNhapSanPhamBienThes(value){
    this.newFormGroupChiTiet.get('GiaNhapSanPhamBienThe').setValue(value)
  }
idncc:any
  getSanPhamNhaCungCap(event) {
    var obj = {
      id: event.target.value
    }
    this.idncc=obj.id
    console.log("object :", obj);
    this.service.gettensanphamhttp(obj).subscribe(res => {
      this.sanphams = res;
      console.log(this.sanphams);
    });
    this.service.getonenhacungcaphttp(obj).subscribe(res => {
      this.motnhacungcap = res;
      console.log("mot nha cung cap",this.motnhacungcap);
    });
  }
  selectedFruit = null;
  getSanPhamBienTheSanPham(event) {
    this.selectedFruit = 'Apple'
    console.log(this.selectedFruit);
    var obj = {
      id: event.target.value
    }
    this.service.gettensanphambienthehttp(obj).subscribe(res => {
      this.sanphambienthes = res;
      console.log("san pham bien the",this.sanphambienthes);
      this.GiaNhapSanPhamBienThes(this.sanphambienthes[0].giaNhap)
    });
  }
  onSubmitChiTiet = (data) => {
      this.chitiets.push(data)
      console.log("chi tiet", this.chitiets)
  }
  tongTien(){
    let sum = 0
    for(var i=0;i< this.chitiets.length;i++){
      sum = sum + (this.chitiets[i].SoLuongNhap * this.chitiets[i].GiaNhapSanPhamBienThe)
    }
    return sum
  }
  public deleteDetail(item: any) {
    for (var index = 0; index < this.chitiets.length; index++) {
      let detail = this.chitiets[index];
      if ( detail.TenSanPhamBienThe == item.TenSanPhamBienThe
        && detail.SoLuongNhap == item.SoLuongNhap) {
        this.chitiets.splice(index, 1);
      }
    }
  }
  phieunhappost:any
  onSubmit=(data) =>{
    this.idUser = localStorage.getItem("idUser")  
    this.service.phieunhappost.nguoiLapPhieu=this.idUser
    this.service.phieunhappost.ghiChu=data.GhiChu
    this.service.phieunhappost.tongTien=this.tongTien()
    this.service.phieunhappost.idNhaCungCap = this.idncc
    this.service.phieunhappost.ChiTietPhieuNhaps=this.chitiets
    console.log("this. service : ",this.service.phieunhappost);
    this.service.post(this.service.phieunhappost).subscribe(
      result=>{
        this.route.navigate(["admin/taophieunhapsuccess"])
      },
      error=>{
      }
    )
  }
}