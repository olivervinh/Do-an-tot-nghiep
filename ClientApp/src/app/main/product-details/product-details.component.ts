import { Component, OnInit ,AfterViewInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import {Product} from '../../model/product.model'
import {sanPhamBienThes} from '../../model/product.model'
import { CartService } from 'src/app/service/product.service';
import { UserService } from 'src/app/service/account/user.service';
import { environment } from 'src/environments/environment';
declare var $: any;
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit ,AfterViewInit{
  public id_product: string;
  public product:Product;
  public size:any;
  public mau:any;
  public list_san_pham_bien_the:sanPhamBienThes[];
  testMarkup:SafeHtml;
  selectMau = null;
  selectSize = null;
  Content="";
  list_review:any;
  soLuong:number;
  constructor(private cartService: CartService,public userService: UserService,public http:HttpClient,public route: ActivatedRoute,private sanitized: DomSanitizer) {
    this.route.params.subscribe(params => {
      this.id_product = params['id']; // get id to params
  });
  this.soLuong=0;
  this.http.get(environment.URL_API+"sanphams/chitietsanpham/"+this.id_product
          ).subscribe(resp => {
              this.product =resp as Product;
              this.list_san_pham_bien_the= this.product.sanPhamBienThes;
              this.testMarkup = this.sanitized.bypassSecurityTrustHtml(this.product.moTa);
              this.http.post(environment.URL_API+"mausacs/mau/",{
                id_san_pham:this.id_product,
    }).subscribe(
      res=>{
        this.mau=res;
      });
      this.size={};
      this.http.post(environment.URL_API+"sanphams/listreview/",{
        IdSanPham:this.product.id
    }).subscribe(
      res=>{
        this.list_review=res;
      });
          });
  }
  ngOnInit(){
  }
  onChangeMau(mau){
    this.http.post(environment.URL_API+"sizes/sizetheomau/",{
      id_san_pham:this.id_product,
      mamau:mau
    }).subscribe(
      res=>{
        this.size=res;
      });
  }
  Review(){
    const clicks = localStorage.getItem('idUser');
    this.http.post(environment.URL_API+"sanphams/review/",{
        IdUser:clicks,
        IdSanPham:this.product.id,
        Content:this.Content,
    }).subscribe(
      res=>{
        this.list_review=res;
        this.Content="";
      });
  }
  soLuongTru(){
    if(this.soLuong>=0)
    {
    }
    else
    {
      this.soLuong--;
    }
  }
  ngAfterViewInit(): void {
    $('.gallery-lb').each(function() { // the containers for all your galleries
			$(this).magnificPopup({
		        delegate: 'a', // the selector for gallery item
		        type: 'image',
		        gallery: {
		        	enabled:true
		        },
		        mainClass: 'mfp-fade'
		    });
		});
    $('.js-addwish-b2').on('click', function(e){
			e.preventDefault();
		});
		$('.js-addwish-b2').each(function(){
			var nameProduct = $(this).parent().parent().find('.js-name-b2').html();
			$(this).on('click', function(){
				Swal.fire(nameProduct, "is added to wishlist !", "success");
				$(this).addClass('js-addedwish-b2');
				$(this).off('click');
			});
		});
      $('.js-addwish-detail').each(function(){
        var nameProduct = $(this).parent().parent().parent().find('.js-name-detail').html();
        $(this).on('click', function(){
          Swal.fire(nameProduct, "đã được thêm vào giỏ hàng !", "success");
          $(this).addClass('js-addedwish-detail');
          $(this).off('click');
        });
      });
      /*---------------------------------------------*/
      $('.js-addcart-detail').each(function(){
        var nameProduct = $(this).parent().parent().parent().parent().find('.js-name-detail').html();
        $(this).on('click', function(){
          Swal.fire(nameProduct, "đã được thêm vào giỏ hàng !", "success");
        });
      });
    $('.wrap-slick3').each(function(){
      $(this).find('.slick3').slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          fade: true,
          infinite: true,
          autoplay: false,
          autoplaySpeed: 6000,
          arrows: true,
          appendArrows: $(this).find('.wrap-slick3-arrows'),
          prevArrow:'<button class="arrow-slick3 prev-slick3"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
          nextArrow:'<button class="arrow-slick3 next-slick3"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
          // dots: true,
          // appendDots: $(this).find('.wrap-slick3-dots'),
          // dotsClass:'slick3-dots',
          // customPaging: function(slick, index) {
          //     var portrait = $(slick.$slides[index]).data('thumb');
          //     return '<img src=" ' + portrait + ' "/><div class="slick3-dot-overlay"></div>';
          // },
      });
  });
  $('.wrap-slick2').each(function(){
    $(this).find('.slick2').slick({
      slidesToShow: 4,
      slidesToScroll: 4,
      infinite: false,
      autoplay: false,
      autoplaySpeed: 6000,
      arrows: true,
      appendArrows: $(this),
      prevArrow:'<button class="arrow-slick2 prev-slick2"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
      nextArrow:'<button class="arrow-slick2 next-slick2"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  });
$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
  var nameTab = $(e.target).attr('href');
  $(nameTab).find('.slick2').slick('reinit');
});
  }
  maxQty(){
    if(this.list_san_pham_bien_the.filter(d=>d.tenMau==this.selectMau&&d.tenSize==this.selectSize)[0]!=null){
      let maxQty = this.list_san_pham_bien_the.filter(d=>d.tenMau==this.selectMau&&d.tenSize==this.selectSize)[0].soLuongTon
      return maxQty
    }
    return 0
  }
  checkQty(){
    if(this.maxQty()<=0){
        return true
    }
  }
  soLuongCong(){
    if(this.soLuong<this.maxQty()){
      this.soLuong++;
    }
  }
  addToCard(product) {
    if( !this.userService.checkLogin())
    {
    }
    else{
      var SanPhamBienThe = this.list_san_pham_bien_the.filter(d=>d.tenMau==this.selectMau&&d.tenSize==this.selectSize)[0];
      const clicks = localStorage.getItem('idUser');
      var SanPhamId=SanPhamBienThe.id;
      this.http.post(environment.URL_API+"Carts"
       ,{
          Id_SanPhamBienThe:SanPhamId,
         SanPhamId:this.product.id,
         Mau:this.selectMau,
         Size:this.selectSize,
         UserID:clicks,
         Soluong:this.soLuong,
       }
      ).subscribe(resp => {
        this.cartService.addToCart(product);
      });
    }
  }
  // addToCard(){
  //   var SanPhamBienThe = this.list_san_pham_bien_the.filter(d=>d.tenMau==this.selectMau&&d.tenSize==this.selectSize)[0];
  //   const clicks = localStorage.getItem('idUser');
  //   var SanPhamId=SanPhamBienThe.id;
  //   console.log(SanPhamId);
  //   this.http.post(environment.URL_API+"Carts"
  //    ,{
  //       Id_SanPhamBienThe:SanPhamId,
  //      SanPhamId:this.product.id,
  //      Mau:this.selectMau,
  //      Size:this.selectSize,
  //      UserID:clicks,
  //    }
  //   ).subscribe(resp => {
  //   });
  // }
}
