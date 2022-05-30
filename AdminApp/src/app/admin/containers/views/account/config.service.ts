import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  _apiURI : string;
  constructor() {
      this._apiURI = 'https://localhost:44302/api';
   }
   getApiURI() {
       return this._apiURI;
   }    
}
