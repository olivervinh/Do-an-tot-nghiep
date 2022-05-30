import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MauSacsComponent } from '../mau-sacs.component';
import { MauSacService } from '../mau-sac.service';
import { CategoryService } from '../../categories/category.service';
import { ToastServiceService } from '../../../shared/toast-service.service';
import { environment } from '../../../../../../environments/environment';
@Component({
  selector: 'app-mau-sac',
  templateUrl: './mau-sac.component.html',
  styleUrls: ['./mau-sac.component.scss']
})
export class MauSacComponent implements OnInit {
  categories: any[] = [];
  constructor(public service: MauSacService,
    public serviceCategory: CategoryService,
    public http: HttpClient,
    public serviceToast: ToastServiceService,
  ) {
    this.serviceCategory.get().subscribe(
      data => {
        Object.assign(this.categories, data)
      }
    )
  }
  get MaMau() { return this.newFormGroup.get('MaMau'); }
  get Id_Loai() { return this.newFormGroup.get('Id_Loai'); }
  ngOnInit(): void {
    this.newFormGroup = new FormGroup({
      MaMau: new FormControl(null,
        [
          Validators.required,
          Validators.minLength(2),
        ]),
      Id_Loai: new FormControl(null,
        [
          Validators.required,
        ])
    });
  }
  selectedFile: File = null;
  public newFormGroup: FormGroup;
  onSubmit = (data) => {
    if (this.service.mausac.id == 0) {
      const formData = new FormData();
      formData.append('MaMau', data.MaMau);
      formData.append('Id_Loai', data.Id_Loai);
      this.http.post(environment.URL_API + 'mausacs', formData)
        .subscribe(res => {
          this.service.getAllMauSacs();
          this.service.mausac.id = 0;
          this.serviceToast.showToastThemThanhCong()
        }, err => {
          this.serviceToast.showToastThemThatBai()
        });
      this.newFormGroup.reset();
    }
    else {
      const formData = new FormData();
      formData.append('MaMau', data.MaMau);
      formData.append('Id_Loai', data.Id_Loai);
      this.http.put(environment.URL_API + 'mausacs/' + `${this.service.mausac.id}`, formData)
        .subscribe(res => {
          this.serviceToast.showToastSuaThanhCong()
          this.service.getAllMauSacs();
          this.service.mausac.id = 0;
        }, err => {
          this.serviceToast.showToastSuaThatBai()
        });
    }
  }
}