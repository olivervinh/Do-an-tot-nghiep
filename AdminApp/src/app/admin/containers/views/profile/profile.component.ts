import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../../../environments/environment';
import { ToastServiceService } from '../../shared/toast-service.service';
import { ProfileService } from './profile.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor( public toast: ToastServiceService, public service : ProfileService, public http: HttpClient) { }
  id: string
  userApp: any
  public newFormGroup: FormGroup;
  ngOnInit(): void {
    this.userApp = JSON.parse(localStorage.getItem("appuser"));
    this.newFormGroup = new FormGroup({
      SDT: new FormControl(null,
        [
          Validators.required,
          Validators.minLength(2),
        ]),
      DiaChi: new FormControl(this.userApp.diaChi,
        [
          Validators.required,
          Validators.minLength(5),
        ]),
        FirstName : new FormControl(this.userApp.firstName,
        [
          Validators.required,
        ]
        ),
        LastName: new FormControl(this.userApp.lastName,
          [
            Validators.required,
            Validators.minLength(5),
          ]
        ),
        UserName : new FormControl(this.userApp.userName,
          [
            Validators.required,
            Validators.minLength(0),
          ]
        ),
        Quyen : new FormControl(this.userApp.quyen,
          [
            Validators.required,
            Validators.minLength(0),
          ]
          ),
        Password : new FormControl(null,
          [
            Validators.required,
            Validators.minLength(0),
          ])  
      });
      this.id =   localStorage.getItem("idUser")
  }
  onSubmit = (data) =>{
   const formData = new FormData();
   formData.append('SDT',data.SDT);
   formData.append('DiaChi',data.DiaChi);
   formData.append('FirstName',data.FirstName);
   formData.append('LastName',data.LastName);
   formData.append('UserName',data.UserName);
   formData.append('Quyen',data.Quyen);
   formData.append('Password',data.Password);
    this.http.put(environment.URL_API+'Accounts/updateprofile/'+`${this.id}`,formData).subscribe(
      response=>{
          this.toast.showToastSuaThanhCong()
      },
      error=>{
      }
    )
  }
}
