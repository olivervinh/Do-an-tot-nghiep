"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var home_component_1 = require("./main/home/home.component");
var shop_component_1 = require("./main/shop/shop.component");
var login_component_1 = require("./main/login/login.component");
var about_component_1 = require("./main/about/about.component");
var checkout_component_1 = require("./main/checkout/checkout.component");
var contact_component_1 = require("./main/contact/contact.component");
var history_component_1 = require("./main/history/history.component");
var product_details_component_1 = require("./main/product-details/product-details.component");
var bill_details_component_1 = require("./main/history/details/bill_details.component");
var like_component_1 = require("./main/like/like.component");
var register_component_1 = require("./main/register/register.component");
var info_user_component_1 = require("./main/info-user/info-user.component");
var blog_component_1 = require("./main/blog/blog.component");
var routes = [
    {
        path: 'info_user',
        component: info_user_component_1.InfoUserComponent,
        data: { breadcrumb: 'info_user' }
    },
    {
        path: 'checkout',
        component: checkout_component_1.CheckoutComponent,
        data: { breadcrumb: 'Checkout' }
    },
    {
        path: 'like',
        component: like_component_1.LikeComponent,
        data: { breadcrumb: 'Like' }
    },
    {
        path: 'history',
        component: history_component_1.HistoryComponent,
        data: { breadcrumb: 'lich-su-mua-hang' }
    },
    {
        path: '',
        component: home_component_1.HomeComponent,
        data: { breadcrumb: 'Home' }
    },
    {
        path: 'register',
        component: register_component_1.RegisterComponent,
        data: { breadcrumb: 'Register' }
    },
    {
        path: 'login',
        component: login_component_1.LoginComponent,
        data: { breadcrumb: 'Login' }
    },
    {
        path: 'shop',
        component: shop_component_1.ShopComponent,
        data: { breadcrumb: 'Shop' }
    },
    {
        path: 'about',
        component: about_component_1.AboutComponent,
        data: { breadcrumb: 'About' }
    },
    {
        path: 'contact',
        component: contact_component_1.ContactComponent,
        data: { breadcrumb: 'Contact' }
    },
    {
        path: 'blog',
        component: blog_component_1.BlogComponent,
        data: { breadcrumb: 'Blog Detail' }
    },
    {
        path: 'product/:id',
        component: product_details_component_1.ProductDetailsComponent
    },
    {
        path: 'bill/:id',
        component: bill_details_component_1.BillDetailsComponent
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
