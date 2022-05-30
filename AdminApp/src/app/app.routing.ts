import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Import Containers
import { DefaultLayoutComponent } from './admin/containers';
import { RegistrationFormComponent } from './admin/containers/views/account/registration-form/registration-form.component';
import { AspNetUsersComponent } from './admin/containers/views/asp-net-users/asp-net-users.component';
import { AuthGuard } from './admin/containers/views/auth.guard';
import { BrandsComponent } from './admin/containers/views/brands/brands.component';
import { CategoriesComponent } from './admin/containers/views/categories/categories.component';
import { P404Component } from './admin/containers/views/error/404.component';
import { P500Component } from './admin/containers/views/error/500.component';
import { SanPhamBienThesComponent } from './admin/containers/views/san-pham-bien-thes/san-pham-bien-thes.component';
import { HoaDonsComponent } from './admin/containers/views/hoa-dons/hoa-dons.component';
import { LoginComponent } from './admin/containers/views/account/login/login.component';
import { MauSacsComponent } from './admin/containers/views/mau-sacs/mau-sacs.component';
import { ProductsComponent } from './admin/containers/views/products/products.component';
import { SizesComponent } from './admin/containers/views/sizes/sizes.component';
import { ProductdetailComponent } from './admin/containers/views/products/productdetail/productdetail.component';
import { ProductComponent } from './admin/containers/views/products/product/product.component';
import { HoaDonComponent } from './admin/containers/views/hoa-dons/hoa-don/hoa-don.component';
import { DashboardComponent } from './admin/containers/views/dashboard/dashboard.component';
import { ChartJSComponent } from './admin/containers/views/chartjs/chartjs.component';
import { UserdetailComponent } from './admin/containers/userdetail/userdetail.component';
import { WidgetsComponent } from './admin/containers/views/widgets/widgets.component';
import { ProfileComponent } from './admin/containers/views/profile/profile.component';
import { ChartSecondComponent } from './admin/containers/views/chart-second/chart-second.component';
import { DiscoutCodesComponent } from './admin/containers/views/discout-codes/discout-codes.component';
import { TaoPhieuNhapsComponent } from './admin/containers/views/tao-phieu-nhaps/tao-phieu-nhaps.component';
import { TaoPhieuNhapComponent } from './admin/containers/views/tao-phieu-nhaps/tao-phieu-nhap/tao-phieu-nhap.component';
import { NhaCungCapsComponent } from './admin/containers/views/nhacungcaps/nhacungcaps.component';
import { NhaCungCapComponent } from './admin/containers/views/nhacungcaps/nhacungcap/nhacungcap.component';
import { TaoPhieuNhapSuccessComponent } from './admin/containers/views/tao-phieu-nhaps/tao-phieu-nhap-success/tao-phieu-nhap-success.component';
import { TaoPhieuNhapDetailComponent } from './admin/containers/views/tao-phieu-nhaps/tao-phieu-nhap-detail/tao-phieu-nhap-detail.component';
import { ChartThirdComponent } from './admin/containers/views/chart-third/chart-third.component';
import { ChatsComponent } from './admin/containers/views/chats/chats.component';
import { BlogsComponent } from './admin/containers/views/blogs/blogs.component';
// import { DefaultLayoutClientComponent } from './client/containers/default-layout-client/default-layout-client.component';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  // {
  //   path:'client',
  //   component:DefaultLayoutClientComponent,
  // },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegistrationFormComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent, canActivate: [AuthGuard],
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'admin/profile',
        component: ProfileComponent
      }
      ,
      {
        path: 'admin/widget',
        component: WidgetsComponent
      },
      {
        path: 'admin/chartsecond',
        component: ChartSecondComponent
      },
      {
        path: 'admin/chartthird',
        component: ChartThirdComponent      },
      {
        path: 'admin/dashboard',
        component: DashboardComponent, canActivate: [AuthGuard],
      },
      {
        path: 'admin/profile',
        component: UserdetailComponent, canActivate: [AuthGuard],
      },
      {
        path: 'admin/chartjs',
        component: ChartJSComponent, canActivate: [AuthGuard],
      },
      {
        path: 'admin/product/add',
        component: ProductComponent, canActivate: [AuthGuard],
      },
      {
        path: 'admin/product/edit/:id',
        component: ProductComponent, canActivate: [AuthGuard],
      },
      {
        path: 'admin/product/detail/:id',
        component: ProductdetailComponent, canActivate: [AuthGuard],
      },
      {
        path: 'admin/products',
        component: ProductsComponent, canActivate: [AuthGuard],
      },
      {
        path: 'admin/nhacungcaps',
        component: NhaCungCapsComponent, canActivate: [AuthGuard],
      },
      {
        path: 'admin/nhacungcap',
        component: NhaCungCapComponent, canActivate: [AuthGuard],
      },
      {
        path: 'admin/categories',
        component: CategoriesComponent, canActivate: [AuthGuard],
      },
      {
        path: 'admin/sanphambienthes',
        component: SanPhamBienThesComponent, canActivate: [AuthGuard],
      },
      {
        path: 'admin/brands',
        component: BrandsComponent, canActivate: [AuthGuard],
      },
      {
        path: 'admin/magiamgias',
        component: DiscoutCodesComponent, canActivate: [AuthGuard],
      },
      {
        path: 'admin/sizes',
        component: SizesComponent, canActivate: [AuthGuard],
      },
      {
        path: 'admin/mausacs',
        component: MauSacsComponent, canActivate: [AuthGuard],
      },
      {
        path: 'admin/hoadons',
        component: HoaDonsComponent, canActivate: [AuthGuard],
      },
      {
        path: 'admin/aspnetusers',
        component: AspNetUsersComponent, canActivate: [AuthGuard],
      },
      {
        path: 'admin/taophieunhap',
        component: TaoPhieuNhapsComponent, canActivate: [AuthGuard],
      },
      {
        path: 'admin/taophieunhapsuccess',
        component: TaoPhieuNhapSuccessComponent, canActivate: [AuthGuard],
      },
      {
        path: 'admin/taophieunhap/them',
        component: TaoPhieuNhapComponent, canActivate: [AuthGuard],
      },
      {
        path: 'admin/hoadon/detail/:id',
        component: HoaDonComponent, canActivate: [AuthGuard],
      },
      {
        path: 'admin/taophieunhap/detail/:id',
        component: TaoPhieuNhapDetailComponent, canActivate: [AuthGuard],
      },
      {
        path: 'admin/chats',
        component: ChatsComponent, canActivate: [AuthGuard],
      },
      {
        path: 'admin/blogs',
        component: BlogsComponent, canActivate: [AuthGuard],
      },
    ]
  },
  { path: '**', component: P404Component }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
