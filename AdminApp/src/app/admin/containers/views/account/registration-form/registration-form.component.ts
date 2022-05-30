import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { UserService } from '../user.service';
import {  UserRegistration} from '../user.service'
import { environment } from '../../../../../../environments/environment';
@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  urls = new Array<string>();
  public newForm: FormGroup;
  gopHam(event){
    this.detectFiles(event)
    this.onSelectFile(event)
  }
  detectFiles(event) {
    this.urls = [];
    let files = event.target.files;
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        }
        reader.readAsDataURL(file);
      }
  }
  selectedFile: FileList;
  onSelectFile(fileInput: any) {
    this.selectedFile = <FileList>fileInput.target.files;
  }
 errors: string;  
 isRequesting: boolean;
 submitted: boolean = false;
 constructor(public userService: UserService,private router: Router,public http : HttpClient, public _snackBar:  MatSnackBar) { 
 }
 onRegister(){
  this.router.navigate(['/register'])
 }
  ngOnInit() {       
    this.newForm = new FormGroup({
      firstName : new FormControl(null),
      lastName : new FormControl(null),
      email: new FormControl(null),
      password : new FormControl(null),
      location : new FormControl(null),
    })
  }
  onSubmit=(data) => {
    let form = new FormData();
    form.append('Email', data.email);
    form.append('Password',data.password);
    form.append('FirstName', data.firstName);
    form.append('LastName', data.lastName);
    form.append('Location',data.location);
    form.append('Quyen','User');
    this.http.post(environment.URL_API+'accounts',form).subscribe
    (result  => {
      this.router.navigate(['/login'],{queryParams: {brandNew: true,email:data.email}});                     
    },
      errors =>  this.errors = errors
    )
}
}