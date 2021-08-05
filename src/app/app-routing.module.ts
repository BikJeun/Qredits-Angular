import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { IndexComponent } from './index/index.component';
import { MerchantManagementComponent } from './merchant-management/merchant-management.component';
import { VoucherManagementComponent } from './voucher-management/voucher-management.component';

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'index', component: IndexComponent },
  { path: 'home', component: HomeComponent },
  { path: 'voucherManagement', component: VoucherManagementComponent },
  { path: 'merchantManagement', component: MerchantManagementComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
