import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import * as signalR from "@microsoft/signalr";
import { HttpClient } from "@microsoft/signalr";
import { ChatService } from "./chat.service";
@Component({
  selector: "app-chats",
  templateUrl: "./chats.component.html",
  styleUrls: ["./chats.component.scss"],
})
export class ChatsComponent implements OnInit {
  constructor(public service: ChatService) {}
  ngOnInit(): void {
    this.service.getallchat()
    const connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl("https://localhost:44302/notify")
      .build();
    connection
      .start()
      .then(function () {
        console.log("SignalR Connected!");
      })
      .catch(function (err) {
        return console.error(err.toString());
      });
    connection.on("BroadcastMessage", () => {
      this.service.getallchat();
    });
    this.newFormGroup = new FormGroup({
      Content: new FormControl(null),
    });
  }
  checkuse(){
    var idlocal=localStorage.getItem("idUser")
    return idlocal
  }
  onSubmit = (data) => {
    const formData = new FormData();
    formData.append("IdUser", localStorage.getItem("idUser"));
    formData.append("Content", data.Content);
    console.log(formData);
    this.service.postchat(formData).subscribe(     
      (res) => {
      }
    );
  };
  public newFormGroup: FormGroup;
}
