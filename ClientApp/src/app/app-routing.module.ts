import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './main/home/home.component';
import { ShopComponent } from './main/shop/shop.component';
import { LoginComponent } from './main/login/login.component';
import { DetailComponent } from './main/blog/detail/detail.component';
import { AboutComponent } from './main/about/about.component';
import { CheckoutComponent } from './main/checkout/checkout.component';
import { ContactComponent } from './main/contact/contact.component';
import { HistoryComponent } from './main/history/history.component';
import {ProductDetailsComponent} from './main/product-details/product-details.component'
import { BillDetailsComponent } from './main/history/details/bill_details.component';
import { LikeComponent } from './main/like/like.component';
import { RegisterComponent } from './main/register/register.component';
import { InfoUserComponent } from './main/info-user/info-user.component';
import { BlogComponent } from './main/blog/blog.component';
const routes: Routes = [
  {
    path: 'info_user',
    component: InfoUserComponent,
    data: {breadcrumb: 'info_user'}
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    data: {breadcrumb: 'Checkout'}
  },
  {
    path: 'like',
    component: LikeComponent,
    data: {breadcrumb: 'Like'}
  },
  {
    path: 'history',
    component: HistoryComponent,
    data: {breadcrumb: 'lich-su-mua-hang'}
  },
  {
    path: '',
    component: HomeComponent,
    data: {breadcrumb: 'Home'}
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {breadcrumb: 'Register'}
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {breadcrumb: 'Login'}
  },
  {
    path: 'shop',
    component: ShopComponent,
    data: {breadcrumb: 'Shop'}
  },
  {
    path: 'about',
    component: AboutComponent,
    data: {breadcrumb: 'About'}
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: {breadcrumb: 'Contact'}
  },
  {
    path: 'blog',
    component: BlogComponent,
    data: {breadcrumb: 'Blog Detail'}
  },
  {
    path: 'product/:id',
    component: ProductDetailsComponent
  },
  {
    path: 'bill/:id',
    component: BillDetailsComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
