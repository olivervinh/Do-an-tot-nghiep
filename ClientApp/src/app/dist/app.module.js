"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/common/http");
var forms_1 = require("@angular/forms");
var ngx_pagination_1 = require("ngx-pagination"); // <-- import the module
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var user_service_1 = require("./service/account/user.service");
var input_1 = require("@angular/material/input");
var header_component_1 = require("./shared/header/header.component");
var sidebar_component_1 = require("./shared/sidebar/sidebar.component");
var cart_component_1 = require("./shared/cart/cart.component");
var slider_component_1 = require("./shared/slider/slider.component");
var banner_component_1 = require("./shared/banner/banner.component");
var checkout_component_1 = require("./main/checkout/checkout.component");
var product_component_1 = require("./shared/product/product.component");
var blog_component_1 = require("./shared/blog/blog.component");
var footer_component_1 = require("./shared/footer/footer.component");
var home_component_1 = require("./main/home/home.component");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var checkbox_1 = require("@angular/material/checkbox");
var login_component_1 = require("./main/login/login.component");
var shop_component_1 = require("./main/shop/shop.component");
var detail_component_1 = require("./main/blog/detail/detail.component");
var about_component_1 = require("./main/about/about.component");
var contact_component_1 = require("./main/contact/contact.component");
var history_component_1 = require("./main/history/history.component");
var bill_details_component_1 = require("./main/history/details/bill_details.component");
var product_details_component_1 = require("./main/product-details/product-details.component");
var filter_pipe_1 = require("./service/pipes/filter.pipe");
var highlight_pipe_1 = require("./service/pipes/highlight.pipe");
var like_component_1 = require("./main/like/like.component");
var icon_1 = require("@angular/material/icon");
var animations_1 = require("@angular/platform-browser/animations");
var register_component_1 = require("./main/register/register.component");
var info_user_component_1 = require("./main/info-user/info-user.component");
var carousel_1 = require("primeng/carousel");
//import {ButtonModule} from 'primeng/button';
//import {ToastModule} from 'primeng/toast';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                history_component_1.HistoryComponent,
                like_component_1.LikeComponent,
                header_component_1.HeaderComponent,
                sidebar_component_1.SidebarComponent,
                cart_component_1.CartComponent,
                checkout_component_1.CheckoutComponent,
                slider_component_1.SliderComponent,
                banner_component_1.BannerComponent,
                product_component_1.ProductComponent,
                blog_component_1.BlogComponent,
                footer_component_1.FooterComponent,
                home_component_1.HomeComponent,
                login_component_1.LoginComponent,
                shop_component_1.ShopComponent,
                detail_component_1.DetailComponent,
                about_component_1.AboutComponent,
                contact_component_1.ContactComponent,
                product_details_component_1.ProductDetailsComponent,
                highlight_pipe_1.HighlightDirective,
                filter_pipe_1.FilterPipe,
                bill_details_component_1.BillDetailsComponent,
                register_component_1.RegisterComponent,
                info_user_component_1.InfoUserComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                icon_1.MatIconModule,
                app_routing_module_1.AppRoutingModule,
                ng_bootstrap_1.NgbModule,
                input_1.MatInputModule,
                //ButtonModule,
                checkbox_1.MatCheckboxModule,
                carousel_1.CarouselModule,
                //ToastModule,
                forms_1.FormsModule, forms_1.ReactiveFormsModule,
                http_1.HttpClientModule,
                ngx_pagination_1.NgxPaginationModule,
                animations_1.BrowserAnimationsModule
            ],
            providers: [user_service_1.UserService,],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
