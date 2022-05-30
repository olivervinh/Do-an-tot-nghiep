import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FileToUploadService {
  ;
  constructor() { }
  public imgsrc : string= '../assets/Resources/Images/san-pham-bien-the/blog-02.jpg';
  public imgsrc1 : string= '../assets/Resources/Images/item/pin.png';
  fileChange(event) {
    var reader = new FileReader()
    reader.readAsDataURL(event.target.files[0])
    reader.onload = (event:any)=>{
      this.imgsrc = event.target.result
    }
  }
  fileChange1(event) {
    var reader = new FileReader()
    reader.readAsDataURL(event.target.files[0])
    reader.onload = (event:any)=>{
      this.imgsrc1 =event.target.result
    }
  }
}
