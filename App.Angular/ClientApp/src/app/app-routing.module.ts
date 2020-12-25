import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './app-common/home/home.component';
import { AuthCallbackComponent } from './app-core/auth/auth-callback/auth-callback.component';
import { SignoutCallbackComponent } from './app-core/auth/signout-callback/signout-callback.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'auth-callback',
    component: AuthCallbackComponent
  },
  {
    path: 'signout-callback',
    component: SignoutCallbackComponent
  },
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'security',
    loadChildren: () => import('./app-security/app-security.module').then(m => m.AppSecurityModule)
  },
  {
    path: 'product',
    loadChildren: () => import('./app-product/app-product.module').then(m => m.AppProductModule)
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
