import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BsNavComponent } from './bs-nav/bs-nav.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessfulComponent } from './order-successful/order-successful.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './auth-guard.service';
import { AuthGuardLoginService } from './auth-guard-login.service';
import { AdminAuthGuardService } from './admin-auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';

const routes: Routes = [
  {path:'',component:ProductComponent},
  {path:'product',component:ProductComponent},
  {path:'shopping-cart',component:ShoppingCartComponent},
  {path:'check-out',component:CheckOutComponent,canActivate: [AuthGuardService]},
  {path:'order-success/:id',component:OrderSuccessfulComponent,canActivate: [AuthGuardService]},
  {path:'my-orders',component:MyOrdersComponent,canActivate: [AuthGuardService]},
  {path:'admin/products/new',component:ProductFormComponent,canActivate: [AuthGuardService,AdminAuthGuardService]},
  {path:'admin/products/:id',component:ProductFormComponent,canActivate: [AuthGuardService,AdminAuthGuardService]},
  {path:'admin/products',component:AdminProductsComponent,canActivate: [AuthGuardService,AdminAuthGuardService]},
  {path:'admin/orders',component:AdminOrdersComponent,canActivate: [AuthGuardService,AdminAuthGuardService]},
  {path:'login',component:LoginComponent,canActivate: [AuthGuardLoginService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 

export const export_class=[
  BsNavComponent,
  HomeComponent,
  ProductComponent,
  ShoppingCartComponent,
  CheckOutComponent,
  OrderSuccessfulComponent,
  MyOrdersComponent,
  AdminProductsComponent,
  AdminOrdersComponent,
  LoginComponent];