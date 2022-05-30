import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../categories/category.service';
import { ToastServiceService } from '../../../shared/toast-service.service';
import { environment } from '../../../../../../environments/environment';
import { NhaCungCapService } from '../nhacungcap.service';
@Component({
  selector: 'app-nhacungcap',
  templateUrl: './nhacungcap.component.html',
  styleUrls: ['./nhacungcap.component.scss']
})
export class NhaCungCapComponent implements OnInit {
  categories: any[] = [];
  constructor(public service: NhaCungCapService,
    public http: HttpClient,
    public serviceToast: ToastServiceService,
  ){
  }
  public newFormGroup: FormGroup;
  get Ten() { return this.newFormGroup.get('Ten'); }
  get SDT() { return this.newFormGroup.get('SDT'); }
  get ThongTin() { return this.newFormGroup.get('ThongTin'); }
  get DiaChi() { return this.newFormGroup.get('DiaChi'); }
  ngOnInit(): void {
    this.newFormGroup = new FormGroup({
      Ten: new FormControl(null,
        [
          Validators.required,
          Validators.minLength(1),
        ]),
      SDT: new FormControl(null,
        [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(20),
        ]),
      ThongTin: new FormControl(null,
        [
          Validators.required,
        ]),
      DiaChi: new FormControl(null,
        [
          Validators.required,
        ]),
    });
  }
  onSubmit = (data) => {
    if (this.service.nhacungcap.id == 0) {
      const formData = new FormData();
      formData.append('Ten', data.Ten);
      formData.append('SDT', data.SDT);
      formData.append('ThongTin', data.ThongTin);
      formData.append('DiaChi', data.DiaChi);
      console.log(data)
      this.http.post(environment.URL_API + 'nhacungcaps', formData)
        .subscribe(res => {
          this.serviceToast.showToastThemThanhCong()
          this.service.getAllNhaCungCaps();
          this.service.nhacungcap.id = 0;
        }, err => {
          this.serviceToast.showToastThemThatBai()
        });
      this.newFormGroup.reset();
    }
    else {
      const formData = new FormData();
      formData.append('Ten', data.Ten);
      formData.append('SDT', data.SDT);
      formData.append('ThongTin', data.ThongTin);
      formData.append('DiaChi', data.DiaChi);
      this.http.put(environment.URL_API + 'nhacungcaps/' + `${this.service.nhacungcap.id}`, formData)
        .subscribe(res => {
          this.serviceToast.showToastSuaThanhCong()
          this.service.getAllNhaCungCaps();
          this.service.nhacungcap.id = 0;
        }, err => {
          this.serviceToast.showToastSuaThatBai()
        });
    }
  }
}