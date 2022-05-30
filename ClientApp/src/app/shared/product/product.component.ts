import { Component, OnInit,AfterViewInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
declare var $: any;
import Swal from 'sweetalert2'
import { CartService } from 'src/app/service/product.service';
import { Product } from 'src/app/model/product.model';
import { switchAll } from 'rxjs/operators';
import * as signalR from '@microsoft/signalr';
import { ProductService } from './product.service';
import { SharedService } from '../shared.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, AfterViewInit{
    public chose_gia;
    public chose_mau;
    public list_product:Product[];
    public list_product_male:Product[];
    public list_product_female:Product[];
    public products:Product[];
    public mausac:any;
    searchText='';
    responsiveOptions;
    public statusData: boolean = false
  constructor(public http:HttpClient,public cart:CartService, public service: ProductService,public sharedservice:SharedService)
  {
    this.chose_gia=1;
    this.chose_mau=1
    this.http
    .get(environment.URL_API+'mausacs/mausac/', {}
    ).subscribe(resp => {
        this.mausac = resp;
    });
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  }
  ngOnInit(){
    this.service.getlaytatcasanpham().subscribe(resp => {
  this.list_product = resp as Product[];
        this.list_product_male= this.list_product.filter(d=>d.gioiTinh==1);
        this.list_product_female= this.list_product.filter(d=>d.gioiTinh==2);
        this.sharedservice.dataloadvariable = true;
        this.statusData = true;
    });
    this.service.getsanphammoi().subscribe(resp => {
        this.products = resp as Product[];
    });
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
    this.service.getlaytatcasanpham().subscribe(resp => {
        this.list_product = resp as Product[];
        this.list_product_male= this.list_product.filter(d=>d.gioiTinh==1);
        this.list_product_female= this.list_product.filter(d=>d.gioiTinh==2);
    });
  });
  connection.on("BroadcastMessage", () => {
    this.service.getsanphammoi().subscribe(resp => {
        this.products = resp as Product[];
        this.statusData = true;
    });
  });
  }   
  like(idSanPham){
    const clicks = localStorage.getItem('idUser');
    this.http
    .post(environment.URL_API+'sanphams/like/', {
        IdSanPham:idSanPham,
        IdUser:clicks,
      }
    ).subscribe(resp => {
        if(resp==1)
        {
            this.list_product.filter(d=>d.id==idSanPham)[0].like==1;
            Swal.fire("Sản phẩm được thêm vào danh sách yêu thích", '', 'success');
        }
        if(resp==2)
        {
            this.list_product.filter(d=>d.id==idSanPham)[0].like==null;
            Swal.fire("Sản phẩm được xoá khỏi danh sách yêu thích", '', 'success');
        }
    });
    this.cart.addToLove(this.list_product.filter(d=>d.id==idSanPham)[0]);
  }
  searchTheoGia(thap,cao,choser){
    this.http
    .post(environment.URL_API+'sanphams/sapxepsanpham', {
      Thap:thap,
      Cao:cao
    }
    ).subscribe(resp => {
        this.list_product = resp as Product[];
        this.list_product_male= this.list_product.filter(d=>d.gioiTinh==1);
        this.list_product_female= this.list_product.filter(d=>d.gioiTinh==2);
        this.chose_gia=choser;
    });
  }
  searchthemau(mausac,chose)
  {
    this.http
    .post(environment.URL_API+'sanphams/searchtheomau', {
      mausac:mausac
    }
    ).subscribe(resp => {
        this.list_product = resp as Product[];
        this.list_product_male= this.list_product.filter(d=>d.gioiTinh==1);
        this.list_product_female= this.list_product.filter(d=>d.gioiTinh==2);
        this.chose_mau=chose;
    });
  }
  onSearchChange(searchValue: string): void {
    this.list_product.filter(d=>d.ten)
  }
  check(idSanPham):number{
      var kq;
    const clicks = localStorage.getItem('idUser');
    this.http
    .post(environment.URL_API+'sanphams/checklike/', {
        IdSanPham:idSanPham,
        IdUser:clicks,
      }
    ).subscribe(resp => {
        kq=resp;
    });
    return kq;
  }
  ngAfterViewInit():void{
    $('.js-show-filter').on('click',function(){
      $(this).toggleClass('show-filter');
      $('.panel-filter').slideToggle(400);
      if($('.js-show-search').hasClass('show-search')) {
          $('.js-show-search').removeClass('show-search');
          $('.panel-search').slideUp(400);
      }
  });
  $('.js-show-search').on('click',function(){
      $(this).toggleClass('show-search');
      $('.panel-search').slideToggle(400);
      if($('.js-show-filter').hasClass('show-filter')) {
          $('.js-show-filter').removeClass('show-filter');
          $('.panel-filter').slideUp(400);
      }
  });
  var $topeContainer = $('.isotope-grid');
  var $filter = $('.filter-tope-group');
  // filter items on button click
  $filter.each(function () {
      $filter.on('click', 'button', function () {
          var filterValue = $(this).attr('data-filter');
          $topeContainer.isotope({filter: filterValue});
      });
  });
  // init Isotope
  $(window).on('load', function () {
      var $grid = $topeContainer.each(function () {
          $(this).isotope({
              itemSelector: '.isotope-item',
              layoutMode: 'fitRows',
              percentPosition: true,
              animationEngine : 'best-available',
              masonry: {
                  columnWidth: '.isotope-item'
              }
          });
      });
  });
  var isotopeButton = $('.filter-tope-group button');
  $(isotopeButton).each(function(){
      $(this).on('click', function(){
          for(var i=0; i<isotopeButton.length; i++) {
              $(isotopeButton[i]).removeClass('how-active1');
          }
          $(this).addClass('how-active1');
      });
  });
  $('.js-show-modal1').on('click',function(e){
    e.preventDefault();
    $('.js-modal1').addClass('show-modal1');
});
$('.js-hide-modal1').on('click',function(){
    $('.js-modal1').removeClass('show-modal1');
});
$('.wrap-slick1').each(function(){
  var wrapSlick1 = $(this);
  var slick1 = $(this).find('.slick1');
  var itemSlick1 = $(slick1).find('.item-slick1');
  var layerSlick1 = $(slick1).find('.layer-slick1');
  var actionSlick1 = [];
  $(slick1).on('init', function(){
      var layerCurrentItem = $(itemSlick1[0]).find('.layer-slick1');
      for(var i=0; i<actionSlick1.length; i++) {
          clearTimeout(actionSlick1[i]);
      }
      $(layerSlick1).each(function(){
          $(this).removeClass($(this).data('appear') + ' visible-true');
      });
      for(var i=0; i<layerCurrentItem.length; i++) {
          actionSlick1[i] = setTimeout(function(index) {
              $(layerCurrentItem[index]).addClass($(layerCurrentItem[index]).data('appear') + ' visible-true');
          },$(layerCurrentItem[i]).data('delay'),i);
      }
  });
  var showDot = false;
  if($(wrapSlick1).find('.wrap-slick1-dots').length > 0) {
      showDot = true;
  }
  $(slick1).slick({
      pauseOnFocus: false,
      pauseOnHover: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      speed: 1000,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 6000,
      arrows: true,
      appendArrows: $(wrapSlick1),
      prevArrow:'<button class="arrow-slick1 prev-slick1"><i class="zmdi zmdi-caret-left"></i></button>',
      nextArrow:'<button class="arrow-slick1 next-slick1"><i class="zmdi zmdi-caret-right"></i></button>',
      dots: showDot,
      appendDots: $(wrapSlick1).find('.wrap-slick1-dots'),
      dotsClass:'slick1-dots',
      customPaging: function(slick, index) {
          var linkThumb = $(slick.$slides[index]).data('thumb');
          var caption = $(slick.$slides[index]).data('caption');
          return  '<img src="' + linkThumb + '">' +
                  '<span class="caption-dots-slick1">' + caption + '</span>';
      },
  });
  $(slick1).on('afterChange', function(event, slick, currentSlide){
      var layerCurrentItem = $(itemSlick1[currentSlide]).find('.layer-slick1');
      for(var i=0; i<actionSlick1.length; i++) {
          clearTimeout(actionSlick1[i]);
      }
      $(layerSlick1).each(function(){
          $(this).removeClass($(this).data('appear') + ' visible-true');
      });
      for(var i=0; i<layerCurrentItem.length; i++) {
          actionSlick1[i] = setTimeout(function(index) {
              $(layerCurrentItem[index]).addClass($(layerCurrentItem[index]).data('appear') + ' visible-true');
          },$(layerCurrentItem[i]).data('delay'),i);
      }
  });
});
  }
}
