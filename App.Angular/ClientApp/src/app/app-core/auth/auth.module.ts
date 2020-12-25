import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { SignoutCallbackComponent } from './signout-callback/signout-callback.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';

@NgModule({
  declarations: [
    AuthCallbackComponent,
    SignoutCallbackComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    AuthCallbackComponent,
    SignoutCallbackComponent
  ],
  entryComponents: [
    AuthCallbackComponent,
    SignoutCallbackComponent
  ],
  providers: [
    AuthService,
    AuthGuardService
]
})

export class AppAuthModule { }
