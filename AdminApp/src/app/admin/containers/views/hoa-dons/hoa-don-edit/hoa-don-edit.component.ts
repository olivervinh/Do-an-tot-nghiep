import { Component, OnInit } from '@angular/core';
import { HoaDonService } from '../hoadon.service';
import * as signalR from '@microsoft/signalr';
@Component({
  selector: 'app-hoa-don-edit',
  templateUrl: './hoa-don-edit.component.html',
  styleUrls: ['./hoa-don-edit.component.scss']
})
export class HoaDonEditComponent implements OnInit {
  constructor(public service: HoaDonService) { }
  ngOnInit(): void {
  }
  onSubmit(hd:any){
    console.log("log ket qua la: ",hd);
    this.service.put(hd).subscribe(
      result=>{
         this.service.getAllHoaDons() 
      },
      error=>{
      })
  }
}
