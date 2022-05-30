import { Component, NgZone, ElementRef, OnInit, ViewChild } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as signalR from '@microsoft/signalr';
import { DashboardService } from './dashboard.service';
import { ToastServiceService } from '../../shared/toast-service.service';
import { MatDialog } from '@angular/material/dialog';
import * as FusionCharts from 'fusioncharts';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { WHITE_ON_BLACK_CSS_CLASS } from '@angular/cdk/a11y/high-contrast-mode/high-contrast-mode-detector';
@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  @ViewChild('pdfTable') pdfTable: ElementRef;
  errorMessage = '';
  constructor(
    public http: HttpClient,
    public service: DashboardService,
    private toast: ToastServiceService,
    public dialog: MatDialog,
    private zone: NgZone
  ) {
  }
  ngOnInit(): void {
    this.getCountProduct()
    this.getCountOrder()
    this.getCountUser();
    this.getCountTotalMoney();
    this.getTopDataSetBanRaTonKho();
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
      this.getCountProduct();
    });
    connection.on("BroadcastMessage", () => {
      this.getCountUser();
    });
    connection.on("BroadcastMessage", () => {
      this.getCountTotalMoney();
    });
    connection.on("BroadcastMessage", () => {
      this.getCountOrder();
    });
    connection.on("BroadcastMessage", () => {
      this.getTopDataSetBanRaTonKho()
    })
  }
  dataSource: any;
  selectedSlice = 'none';
  chart: any;
  lineChartData: ChartDataSets[] = [
    { data: [], label: 'Giá trị sản phẩm tồn (giá mua * số lượng tồn)', backgroundColor: 'rgb(0,0,255)',borderWidth:0.2 },
    { data: [], label: 'Giá trị sản phẩm bán ra (giá bán * số lượng trong chi tiết đơn hàng)', backgroundColor: 'rgb(250,255,65)',borderWidth:0.2 },
  ];
  lineChartLabels: Label[] = [];
  lineChartOptions = {
    responsive: true,
  };
  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];
  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';
  countProduct: number;
  countOrder: number;
  countUser: number;
  countTotalMoney: number;
  getCountProduct() {
    this.service.getCountProduct().subscribe(
      result => {
        this.countProduct = result as number
      },
      error => {
        this.errorMessage = <any>error
      }
    )
  }
  getCountOrder() {
    this.service.getCountOrder().subscribe(
      result => {
        this.countOrder = result as number
      },
      error => this.errorMessage = <any>error
    )
  }
  getCountUser() {
    this.service.getCountUser().subscribe(
      result => {
        this.countUser = result as number
      },
      error => this.errorMessage = <any>error
    )
  }
  getCountTotalMoney() {
    this.service.getCountTotalMoney().subscribe(
      result => {
        this.countTotalMoney = result as number
      },
      error => {
        this.errorMessage = <any>error
      }
    )
  }
  //quantrong
  datasetbanratonkho: any
  lenghttonkho: any
  getTopDataSetBanRaTonKho() {
    this.service.getTopDataSetBanRaTonKho().subscribe(
      result => {
        this.datasetbanratonkho = result as any
        this.lenghttonkho = this.datasetbanratonkho.length
        this.lineChartLabels = new Array(this.lenghttonkho)
        this.lineChartData[0].data = new Array(this.lenghttonkho)
        for (var i = 0; i < this.lenghttonkho; i++) {
          this.lineChartLabels[i] = this.datasetbanratonkho[i].ten
          this.lineChartData[1].data[i] = this.datasetbanratonkho[i].giaTriBanRa
          this.lineChartData[0].data[i] = this.datasetbanratonkho[i].giaTriTonKho
        }
      },
      error => {
        this.errorMessage = error as any
      })
    }
  }