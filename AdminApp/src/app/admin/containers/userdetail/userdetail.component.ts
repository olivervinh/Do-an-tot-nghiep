import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.scss']
})
export class UserdetailComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {
  }
}
export class UserIdenity {
  firstName : string
  lastName : string
  imagePath : string
  email : string
} 
