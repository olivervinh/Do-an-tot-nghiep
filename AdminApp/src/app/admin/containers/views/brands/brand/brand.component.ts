import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BrandsComponent } from '../brands.component';
import { BrandService } from '../brand.service';
import { ToastrService } from 'ngx-toastr';
import { NotifierService } from 'angular-notifier';
import { environment } from '../../../../../../environments/environment';
@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {
  public BrandsComponent : BrandsComponent
  constructor(  public service : BrandService,
                public http :HttpClient ,
                public toastr: ToastrService,
              ) {
                }
get name() { return this.newFormGroup.get('Name'); }
get ThongTin() { return this.newFormGroup.get('ThongTin'); }
ngOnInit(): void {
this.newFormGroup = new FormGroup({
Name: new FormControl(null,
  [
    Validators.required,
    Validators.minLength(2),
  ]),
ThongTin: new FormControl(null,
  [
    Validators.required,
    Validators.minLength(5),
  ]),
TileImage : new FormControl(null,
  [
    Validators.required,
  ]
  )
});
}
public newFormGroup: FormGroup;
showToastThemThanhCong(){
  this.toastr.success("Thêm thành công")
}
showToastSuaThanhCong(){
  this.toastr.success("Sửa thành công")
}
showToastThemThatBai(){
  this.toastr.error("Thêm thất bại")
}
showToastSuaThatBai(){
  this.toastr.error("Sửa thất bại")
}
onSubmit=(data) =>{
if(this.service.brand.id==0){
const formData = new FormData();
formData.append('Name', data.Name);
console.log(data)
this.http.post(environment.URL_API+'nhanhieus', formData)
.subscribe(res => {
  this.showToastThemThanhCong()
this.service.getAllBrands();
this.service.brand.id=0;
},
err=>{
  this.showToastThemThatBai()
});
this.newFormGroup.reset();
}
else
{
const formData = new FormData();
formData.append('Name', data.Name);
formData.append('ThongTin', data.ThongTin);
this.http.put(environment.URL_API+'nhanhieus/'+`${this.service.brand.id}`, formData)
.subscribe(res=>{
  this.showToastSuaThanhCong()
  this.service.getAllBrands();
this.service.brand.id=0;
},
err=>{
  this.showToastSuaThatBai()
});
}
}
}