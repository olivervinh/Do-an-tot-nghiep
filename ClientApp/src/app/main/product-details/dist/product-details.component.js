"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductDetailsComponent = void 0;
var core_1 = require("@angular/core");
var sweetalert2_1 = require("sweetalert2");
var ProductDetailsComponent = /** @class */ (function () {
    function ProductDetailsComponent(cartService, userService, http, route, sanitized) {
        var _this = this;
        this.cartService = cartService;
        this.userService = userService;
        this.http = http;
        this.route = route;
        this.sanitized = sanitized;
        this.selectMau = null;
        this.selectSize = null;
        this.Content = "";
        this.route.params.subscribe(function (params) {
            _this.id_product = params['id']; // get id to params
        });
        this.soLuong = 0;
        this.http.get(environment.URL_API+"sanphams/chitietsanpham/" + this.id_product).subscribe(function (resp) {
            _this.product = resp;
            _this.list_san_pham_bien_the = _this.product.sanPhamBienThes;
            _this.testMarkup = _this.sanitized.bypassSecurityTrustHtml(_this.product.moTa);
            _this.http.post(environment.URL_API+"mausacs/mau/", {
                id_san_pham: _this.id_product
            }).subscribe(function (res) {
                _this.mau = res;
            });
            _this.size = {};
            _this.http.post(environment.URL_API+"sanphams/listreview/", {
                IdSanPham: _this.product.id
            }).subscribe(function (res) {
                _this.list_review = res;
            });
        });
    }
    ProductDetailsComponent.prototype.ngOnInit = function () {
    };
    ProductDetailsComponent.prototype.onChangeMau = function (mau) {
        var _this = this;
        this.http.post(environment.URL_API+"sizes/sizetheomau/", {
            id_san_pham: this.id_product,
            mamau: mau
        }).subscribe(function (res) {
            _this.size = res;
        });
    };
    ProductDetailsComponent.prototype.Review = function () {
        var _this = this;
        var clicks = localStorage.getItem('idUser');
        this.http.post(environment.URL_API+"sanphams/review/", {
            IdUser: clicks,
            IdSanPham: this.product.id,
            Content: this.Content
        }).subscribe(function (res) {
            _this.list_review = res;
            _this.Content = "";
        });
    };
    ProductDetailsComponent.prototype.soLuongTru = function () {
        if (this.soLuong >= 0) {
        }
        else {
            this.soLuong--;
        }
    };
    ProductDetailsComponent.prototype.ngAfterViewInit = function () {
        $('.gallery-lb').each(function () {
            $(this).magnificPopup({
                delegate: 'a',
                type: 'image',
                gallery: {
                    enabled: true
                },
                mainClass: 'mfp-fade'
            });
        });
        $('.js-addwish-b2').on('click', function (e) {
            e.preventDefault();
        });
        $('.js-addwish-b2').each(function () {
            var nameProduct = $(this).parent().parent().find('.js-name-b2').html();
            $(this).on('click', function () {
                sweetalert2_1["default"].fire(nameProduct, "is added to wishlist !", "success");
                $(this).addClass('js-addedwish-b2');
                $(this).off('click');
            });
        });
        $('.js-addwish-detail').each(function () {
            var nameProduct = $(this).parent().parent().parent().find('.js-name-detail').html();
            $(this).on('click', function () {
                sweetalert2_1["default"].fire(nameProduct, "đã được thêm vào giỏ hàng !", "success");
                $(this).addClass('js-addedwish-detail');
                $(this).off('click');
            });
        });
        /*---------------------------------------------*/
        $('.js-addcart-detail').each(function () {
            var nameProduct = $(this).parent().parent().parent().parent().find('.js-name-detail').html();
            $(this).on('click', function () {
                sweetalert2_1["default"].fire(nameProduct, "đã được thêm vào giỏ hàng !", "success");
            });
        });
        $('.wrap-slick3').each(function () {
            $(this).find('.slick3').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                fade: true,
                infinite: true,
                autoplay: false,
                autoplaySpeed: 6000,
                arrows: true,
                appendArrows: $(this).find('.wrap-slick3-arrows'),
                prevArrow: '<button class="arrow-slick3 prev-slick3"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
                nextArrow: '<button class="arrow-slick3 next-slick3"><i class="fa fa-angle-right" aria-hidden="true"></i></button>'
            });
        });
        $('.wrap-slick2').each(function () {
            $(this).find('.slick2').slick({
                slidesToShow: 4,
                slidesToScroll: 4,
                infinite: false,
                autoplay: false,
                autoplaySpeed: 6000,
                arrows: true,
                appendArrows: $(this),
                prevArrow: '<button class="arrow-slick2 prev-slick2"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
                nextArrow: '<button class="arrow-slick2 next-slick2"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
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
    };
    ProductDetailsComponent.prototype.maxQty = function () {
        var _this = this;
        if (this.list_san_pham_bien_the.filter(function (d) { return d.tenMau == _this.selectMau && d.tenSize == _this.selectSize; })[0] != null) {
            var maxQty = this.list_san_pham_bien_the.filter(function (d) { return d.tenMau == _this.selectMau && d.tenSize == _this.selectSize; })[0].soLuongTon;
            return maxQty;
        }
        return 0;
    };
    ProductDetailsComponent.prototype.checkQty = function () {
        if (this.maxQty() <= 0) {
            return true;
        }
    };
    ProductDetailsComponent.prototype.soLuongCong = function () {
        if (this.soLuong < this.maxQty()) {
            this.soLuong++;
        }
    };
    ProductDetailsComponent.prototype.addToCard = function (product) {
        var _this = this;
        if (!this.userService.checkLogin()) {
        }
        else {
            var SanPhamBienThe = this.list_san_pham_bien_the.filter(function (d) { return d.tenMau == _this.selectMau && d.tenSize == _this.selectSize; })[0];
            var clicks = localStorage.getItem('idUser');
            var SanPhamId = SanPhamBienThe.id;
            this.http.post(environment.URL_API+"Carts", {
                Id_SanPhamBienThe: SanPhamId,
                SanPhamId: this.product.id,
                Mau: this.selectMau,
                Size: this.selectSize,
                UserID: clicks,
                Soluong: this.soLuong
            }).subscribe(function (resp) {
                _this.cartService.addToCart(product);
            });
        }
    };
    ProductDetailsComponent = __decorate([
        core_1.Component({
            selector: 'app-product-details',
            templateUrl: './product-details.component.html',
            styleUrls: ['./product-details.component.scss']
        })
    ], ProductDetailsComponent);
    return ProductDetailsComponent;
}());
exports.ProductDetailsComponent = ProductDetailsComponent;
