import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ProductComponent } from './product/product.component';
import { ProductdetailComponent } from './productdetail/productdetail.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CheckComponent } from './check/check.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { CartComponent } from './cart/cart.component';
import { OrderTrackingComponent } from './order-tracking/order-tracking.component';
import { FirstComponent } from './first/first.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { ProductAdminComponent } from './product-admin/product-admin.component';
import { ProductAdminDeleteComponent } from './product-admin-delete/product-admin-delete.component';
import { ProductAdminDetailComponent } from './product-admin-detail/product-admin-detail.component';
import { ProductAdminNewComponent } from './product-admin-new/product-admin-new.component';
import { ProductAdminUpdateComponent } from './product-admin-update/product-admin-update.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', component: CatalogComponent },
  { path: 'forgetpassword', component: ForgetpasswordComponent },
  { path: 'login', component: FirstComponent },
  { path: 'product', component: ProductComponent },
  { path: 'catalog/productdetail/:id', component: ProductdetailComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'check', component: CheckComponent },
  { path: 'about-us', component: AboutusComponent },
  { path: 'cart', component: CartComponent },
  { path: 'track-order/:id', component: OrderTrackingComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'product-admin', component: ProductAdminComponent },
  { path: 'product-admin/new', component: ProductAdminNewComponent },
  { path: 'product-admin/edit/:id', component: ProductAdminUpdateComponent },
  { path: 'product-admin/detail/:id', component: ProductAdminDetailComponent },
  { path: 'product-admin/delete/:id', component: ProductAdminDeleteComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
