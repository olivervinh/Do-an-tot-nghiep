import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  newchat:Chat = new Chat()
  constructor(public http: HttpClient) { }
  gethttp(): Observable<any>{
    return this.http.get(environment.URL_API+"userchats/getchat")
  }
  chatarray:any
  chat:any
  getallchat(){
  this.gethttp().subscribe(result=>{
    this.chatarray = result 
    console.log("sub",this.chatarray); 
  })
  console.log("nosub",this.chatarray); 
  }
  postchat(chat){
    return this.http.post(environment.URL_API+"userchats/addchat",chat)
  }
}
export class Chat{
  content:string
}