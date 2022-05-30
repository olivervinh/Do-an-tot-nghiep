import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  _apiURI : string;
  constructor() {
      this._apiURI = environment.URL_API;
   }
   getApiURI() {
       return this._apiURI;
   }    
}
