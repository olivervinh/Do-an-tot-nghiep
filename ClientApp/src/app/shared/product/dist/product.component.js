"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductComponent = void 0;
var core_1 = require("@angular/core");
var sweetalert2_1 = require("sweetalert2");
var ProductComponent = /** @class */ (function () {
    function ProductComponent(http, cart) {
        var _this = this;
        this.http = http;
        this.cart = cart;
        this.searchText = '';
        this.chose_gia = 1;
        this.chose_mau = 1;
        this.http
            .get('https://localhost:44302/api/mausacs/mausac/', {}).subscribe(function (resp) {
            _this.mausac = resp;
        });
        this.http
            .get('https://localhost:44302/api/sanphams/laytatcasanpham', {}).subscribe(function (resp) {
            _this.list_product = resp;
            _this.list_product_male = _this.list_product.filter(function (d) { return d.gioiTinh == 1; });
            _this.list_product_female = _this.list_product.filter(function (d) { return d.gioiTinh == 2; });
        });
        this.http
            .get('https://localhost:44302/api/sanphams/topsanphammoi', {}).subscribe(function (resp) {
            _this.products = resp;
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
    ProductComponent.prototype.ngOnInit = function () {
    };
    ProductComponent.prototype.like = function (idSanPham) {
        var _this = this;
        var clicks = localStorage.getItem('idUser');
        this.http
            .post('https://localhost:44302/api/sanphams/like/', {
            IdSanPham: idSanPham,
            IdUser: clicks
        }).subscribe(function (resp) {
            if (resp == 1) {
                _this.list_product.filter(function (d) { return d.id == idSanPham; })[0].like == 1;
                sweetalert2_1["default"].fire("Sản phẩm được thêm vào danh sách yêu thích", '', 'success');
            }
            if (resp == 2) {
                _this.list_product.filter(function (d) { return d.id == idSanPham; })[0].like == null;
                sweetalert2_1["default"].fire("Sản phẩm được xoá khỏi danh sách yêu thích", '', 'success');
            }
        });
        this.cart.addToLove(this.list_product.filter(function (d) { return d.id == idSanPham; })[0]);
    };
    ProductComponent.prototype.searchTheoGia = function (thap, cao, choser) {
        var _this = this;
        this.http
            .post('https://localhost:44302/api/sanphams/sapxepsanpham', {
            Thap: thap,
            Cao: cao
        }).subscribe(function (resp) {
            _this.list_product = resp;
            _this.list_product_male = _this.list_product.filter(function (d) { return d.gioiTinh == 1; });
            _this.list_product_female = _this.list_product.filter(function (d) { return d.gioiTinh == 2; });
            _this.chose_gia = choser;
        });
    };
    ProductComponent.prototype.searchthemau = function (mausac, chose) {
        var _this = this;
        this.http
            .post('https://localhost:44302/api/sanphams/searchtheomau', {
            mausac: mausac
        }).subscribe(function (resp) {
            _this.list_product = resp;
            _this.list_product_male = _this.list_product.filter(function (d) { return d.gioiTinh == 1; });
            _this.list_product_female = _this.list_product.filter(function (d) { return d.gioiTinh == 2; });
            _this.chose_mau = chose;
        });
    };
    ProductComponent.prototype.onSearchChange = function (searchValue) {
        this.list_product.filter(function (d) { return d.ten; });
    };
    ProductComponent.prototype.check = function (idSanPham) {
        var kq;
        var clicks = localStorage.getItem('idUser');
        this.http
            .post('https://localhost:44302/api/sanphams/checklike/', {
            IdSanPham: idSanPham,
            IdUser: clicks
        }).subscribe(function (resp) {
            kq = resp;
        });
        return kq;
    };
    ProductComponent.prototype.ngAfterViewInit = function () {
        $('.js-show-filter').on('click', function () {
            $(this).toggleClass('show-filter');
            $('.panel-filter').slideToggle(400);
            if ($('.js-show-search').hasClass('show-search')) {
                $('.js-show-search').removeClass('show-search');
                $('.panel-search').slideUp(400);
            }
        });
        $('.js-show-search').on('click', function () {
            $(this).toggleClass('show-search');
            $('.panel-search').slideToggle(400);
            if ($('.js-show-filter').hasClass('show-filter')) {
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
                $topeContainer.isotope({ filter: filterValue });
            });
        });
        // init Isotope
        $(window).on('load', function () {
            var $grid = $topeContainer.each(function () {
                $(this).isotope({
                    itemSelector: '.isotope-item',
                    layoutMode: 'fitRows',
                    percentPosition: true,
                    animationEngine: 'best-available',
                    masonry: {
                        columnWidth: '.isotope-item'
                    }
                });
            });
        });
        var isotopeButton = $('.filter-tope-group button');
        $(isotopeButton).each(function () {
            $(this).on('click', function () {
                for (var i = 0; i < isotopeButton.length; i++) {
                    $(isotopeButton[i]).removeClass('how-active1');
                }
                $(this).addClass('how-active1');
            });
        });
        $('.js-show-modal1').on('click', function (e) {
            e.preventDefault();
            $('.js-modal1').addClass('show-modal1');
        });
        $('.js-hide-modal1').on('click', function () {
            $('.js-modal1').removeClass('show-modal1');
        });
        $('.wrap-slick1').each(function () {
            var wrapSlick1 = $(this);
            var slick1 = $(this).find('.slick1');
            var itemSlick1 = $(slick1).find('.item-slick1');
            var layerSlick1 = $(slick1).find('.layer-slick1');
            var actionSlick1 = [];
            $(slick1).on('init', function () {
                var layerCurrentItem = $(itemSlick1[0]).find('.layer-slick1');
                for (var i = 0; i < actionSlick1.length; i++) {
                    clearTimeout(actionSlick1[i]);
                }
                $(layerSlick1).each(function () {
                    $(this).removeClass($(this).data('appear') + ' visible-true');
                });
                for (var i = 0; i < layerCurrentItem.length; i++) {
                    actionSlick1[i] = setTimeout(function (index) {
                        $(layerCurrentItem[index]).addClass($(layerCurrentItem[index]).data('appear') + ' visible-true');
                    }, $(layerCurrentItem[i]).data('delay'), i);
                }
            });
            var showDot = false;
            if ($(wrapSlick1).find('.wrap-slick1-dots').length > 0) {
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
                prevArrow: '<button class="arrow-slick1 prev-slick1"><i class="zmdi zmdi-caret-left"></i></button>',
                nextArrow: '<button class="arrow-slick1 next-slick1"><i class="zmdi zmdi-caret-right"></i></button>',
                dots: showDot,
                appendDots: $(wrapSlick1).find('.wrap-slick1-dots'),
                dotsClass: 'slick1-dots',
                customPaging: function (slick, index) {
                    var linkThumb = $(slick.$slides[index]).data('thumb');
                    var caption = $(slick.$slides[index]).data('caption');
                    return '<img src="' + linkThumb + '">' +
                        '<span class="caption-dots-slick1">' + caption + '</span>';
                }
            });
            $(slick1).on('afterChange', function (event, slick, currentSlide) {
                var layerCurrentItem = $(itemSlick1[currentSlide]).find('.layer-slick1');
                for (var i = 0; i < actionSlick1.length; i++) {
                    clearTimeout(actionSlick1[i]);
                }
                $(layerSlick1).each(function () {
                    $(this).removeClass($(this).data('appear') + ' visible-true');
                });
                for (var i = 0; i < layerCurrentItem.length; i++) {
                    actionSlick1[i] = setTimeout(function (index) {
                        $(layerCurrentItem[index]).addClass($(layerCurrentItem[index]).data('appear') + ' visible-true');
                    }, $(layerCurrentItem[i]).data('delay'), i);
                }
            });
        });
    };
    ProductComponent = __decorate([
        core_1.Component({
            selector: 'app-product',
            templateUrl: './product.component.html',
            styleUrls: ['./product.component.scss']
        })
    ], ProductComponent);
    return ProductComponent;
}());
exports.ProductComponent = ProductComponent;
