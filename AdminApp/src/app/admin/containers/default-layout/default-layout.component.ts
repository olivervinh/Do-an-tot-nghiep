import { Component, OnInit } from '@angular/core';
import { navItems } from '../../../_nav';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginComponent } from '../views/account/login/login.component';
import { UserService } from '../views/account/user.service';
import { ModalService } from '../modal/modal.service';
import * as signalR from '@microsoft/signalr';
import { NotificationCheckOutCountResult, NotificationCheckOutResult, NotificationCountResult, NotificationResult } from './notification/notification';
import { NotificationService } from './notification/notification.service';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  public user: UserIdenity = new UserIdenity()
  notification: NotificationCountResult;
  messages: Array<NotificationResult>;
  errorMessage = '';
  notificationCheckOut: NotificationCheckOutCountResult;
  messagesCheckOut: Array<NotificationCheckOutResult>;
  fullname: string;
  constructor(
    private notificationService: NotificationService,
    private modalService: ModalService,
    public userService: UserService,
    public router: Router,
    public http: HttpClient
  ) {
  }
  isExpanded = false;
  onSelectedLogout() {
    this.userService.logout()
  }
  ngOnInit(): void {
    this.fullname=localStorage.getItem("fullname")
    this.getNotificationCheckOutCount();
    this.getNotificationCount();
    const connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl('https://localhost:44302/notify')
      .build();
    connection.start().then(function () {
      console.log('SignalR Connected!');
    }).catch(function (err) {
      return console.error(err.toString());
    });
    connection.on("BroadcastMessage", () => {
      this.getNotificationCount();
    });
    connection.on("BroadcastMessage", () => {
      this.getNotificationCheckOutCount();
    });
  }
  collapse() {
    this.isExpanded = false;
  }
  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  deleteNotificationCheckOuts(): void {
    if (confirm(`Are you sure want to delete all checkout notifications?`)) {
      this.notificationService.deleteNotificationCheckOuts()
        .subscribe(
          () => {
            this.closeModalCheckOut();
          },
          (error: any) => this.errorMessage = <any>error
        );
    }
  }
  getNotificationCheckOutCount() {
    this.notificationService.getNotificationCheckOutCount().subscribe(
      notification => {
        this.notificationCheckOut = notification;
      },
      error => this.errorMessage = <any>error
    );
  }
  getNotificationCheckOutMessage() {
    this.notificationService.getNotificationCheckOutMessage().subscribe(
      messages => {
        this.messagesCheckOut = messages;
      },
      error => this.errorMessage = <any>error
    );
  }
  getNotificationCount() {
    this.notificationService.getNotificationCount().subscribe(
      notification => {
        this.notification = notification;
      },
      error => this.errorMessage = <any>error
    );
  }
  getNotificationMessage() {
    this.notificationService.getNotificationMessage().subscribe(
      messages => {
        this.messages = messages;
      },
      error => this.errorMessage = <any>error
    );
  }
  deleteNotifications(): void {
    if (confirm(`Are you sure want to delete all notifications?`)) {
      this.notificationService.deleteNotifications()
        .subscribe(
          () => {
            this.closeModal();
          },
          (error: any) => this.errorMessage = <any>error
        );
    }
  }
  openModal() {
    this.getNotificationMessage();
    this.modalService.open('custom-modal');
  }
  closeModal() {
    this.modalService.close('custom-modal');
  }
 openModalCheckOut() {
    this.getNotificationCheckOutMessage();
    this.modalService.open('custom-modal-checkout');
  }
  closeModalCheckOut() {
    this.modalService.close('custom-modal-checkout');
  }
  public sidebarMinimized = false;
  public navItems = navItems;
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  routeCheckOut() {
    this.modalService.close('custom-modal-checkout');
    this.modalService.close('custom-modal');
    this.router.navigate(['/hoadons']);
  }
}
export class UserIdenity {
  firstName: string
  lastName: string
  imagePath: string
  email: string
}
