import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserService } from './service/account/user.service';
import {MatInputModule} from '@angular/material/input';
import { CartService } from './service/product.service';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CartComponent } from './shared/cart/cart.component';
import { SliderComponent } from './shared/slider/slider.component';
import { BannerComponent } from './shared/banner/banner.component';
import { CheckoutComponent } from './main/checkout/checkout.component';
import { ProductComponent } from './shared/product/product.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './main/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { LoginComponent } from './main/login/login.component';
import { ShopComponent } from './main/shop/shop.component';
import { DetailComponent } from './main/blog/detail/detail.component';
import { AboutComponent } from './main/about/about.component';
import { ContactComponent } from './main/contact/contact.component';
import { HistoryComponent } from './main/history/history.component';
import { BillDetailsComponent } from './main/history/details/bill_details.component';
import { ProductDetailsComponent } from './main/product-details/product-details.component';
import {FilterPipe} from './service/pipes/filter.pipe';
import { HighlightDirective } from './service/pipes/highlight.pipe';
import { LikeComponent } from './main/like/like.component';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './main/register/register.component';
import { InfoUserComponent } from './main/info-user/info-user.component';
import {CarouselModule} from 'primeng/carousel';
import { BlogComponent } from './main/blog/blog.component';
import { LoginfacebookComponent } from './loginfacebookgoogle/loginfacebook/loginfacebook.component';
import { FacebookModule } from 'ngx-facebook';;
import { SocialLoginModule,SocialAuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { environment } from 'src/environments/environment';
@NgModule({
  declarations: [
    AppComponent,
    HistoryComponent,
    LikeComponent,
    HeaderComponent,
    SidebarComponent,
    CartComponent,
    CheckoutComponent,
    SliderComponent,
    BannerComponent,
    ProductComponent,
    BlogComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    ShopComponent,
    DetailComponent,
    AboutComponent,
    ContactComponent,
    ProductDetailsComponent,
    HighlightDirective,
    FilterPipe,
    BillDetailsComponent,
    RegisterComponent,
    InfoUserComponent,
    LoginfacebookComponent
  ],
  imports: [
    FacebookModule.forRoot(),
    BrowserModule,
    MatIconModule,
    AppRoutingModule,
    NgbModule,
    MatInputModule,
    //ButtonModule,
    MatCheckboxModule,
    CarouselModule,
    //ToastModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    BrowserModule, FormsModule, SocialLoginModule
  ],
  providers: [
    UserService,
    {
      provide: "SocialAuthServiceConfig",
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.GG_CLIENT_ID
            )
          }
        ]
      } as SocialAuthServiceConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
