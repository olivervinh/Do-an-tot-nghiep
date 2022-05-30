import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { environment } from '../../../../../../environments/environment';
import { ChartSecondService } from '../chart-second.service';
@Component({
  selector: 'app-select-month',
  templateUrl: './select-month.component.html',
  styleUrls: ['./select-month.component.scss']
})
export class SelectMonthComponent implements OnInit {
  constructor(public service:ChartSecondService,
              public http: HttpClient) { }
  public newFormGroup: FormGroup;
  ngOnInit(): void {
    this.newFormGroup = new FormGroup({
      Thang: new FormControl(null,
        [
        ]),
    });
  }
  onSubmit = (data) => {
    const formData = new FormData();
    formData.append("month", data.Thang)
    this.http.post(environment.URL_API + "ThongKeBieuDos/topthongkengaytheothang", formData).subscribe(
      (result: any) => {
        this.service.dataThongKeNgay = result as any
        if (this.service.dataThongKeNgay.length != 0) {
          this.service.dataThongKeNgay = result as any
          console.log(this.service.dataThongKeNgay);
          for (var i = 0; i < this.service.dataThongKeNgay.length; i++) {
            this.service.dataSourceNgay.data[i].label = this.service.dataThongKeNgay[i].ngay as any
            this.service.dataSourceNgay.data[i].value = this.service.dataThongKeNgay[i].revenues as any
          }
        }
        else {
          for (var i = 0; i < 31; i++) {
            this.service.dataSourceNgay.data[i].label = ""
            this.service.dataSourceNgay.data[i].value = ""
          }
        }
      },
      error => {
      }
    )
  }
}
