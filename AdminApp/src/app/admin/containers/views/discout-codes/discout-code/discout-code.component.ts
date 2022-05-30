import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../../../../environments/environment';
import { ToastServiceService } from '../../../shared/toast-service.service';
import { CategoryService } from '../../categories/category.service';
import { DiscountCodeService } from '../discount-code.service';
@Component({
  selector: 'app-discout-code',
  templateUrl: './discout-code.component.html',
  styleUrls: ['./discout-code.component.scss']
})
export class DiscoutCodeComponent implements OnInit {
  constructor(public service: DiscountCodeService,
    public toastService: ToastServiceService,
   private http: HttpClient,
  ) {
  }
  get SoTienGiam() { return this.newFormGroup.get('SoTienGiam'); }
  ngOnInit(): void {
    this.newFormGroup = new FormGroup({
      SoTienGiam: new FormControl(null,
        [
          Validators.required,
        ]),
    });
  }
  public newFormGroup: FormGroup;
  onSubmit = (data) => {
    if (this.service.magiamgia.id == 0) {
      const formData = new FormData()
      formData.append('SoTienGiam', data.SoTienGiam);
      this.http.post(environment.URL_API + 'magiamgias',formData)
        .subscribe(res => {
          this.toastService.showToastThemThanhCong();
          this.service.getAllMaGiamGias()
          this.service.magiamgia.id = 0;
        }, err => {
          this.toastService.showToastThemThatBai()
        });
      this.newFormGroup.reset();
    }
    else {
      const formData = new FormData();
      formData.append('SoTienGiam', data.SoTienGiam);
      this.http.put(environment.URL_API + 'magiamgias/' + `${this.service.magiamgia.id}`, formData)
        .subscribe(res => {
          this.toastService.showToastSuaThanhCong();
          this.service.getAllMaGiamGias()
          this.service.magiamgia.id = 0;
        },
          error => {
            this.toastService.showToastXoaThatBai()
          });
    }
  }
}
