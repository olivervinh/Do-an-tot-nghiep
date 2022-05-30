import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  userprofile : UserProfile = new UserProfile()
  constructor() { }
}
export class UserProfile{
   sDT : string
   diaChi : string
   firstName : string
   lastName : string
   userName : string
   quyen :string
   password :string  
}
