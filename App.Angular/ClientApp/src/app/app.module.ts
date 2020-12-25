import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TokenInterceptor } from './app-core/auth/services/token-interceptor';
import { AppCommonModule } from './app-common/app-common.module';

import { SharedMaterialModule } from './app.shared.materials.modules';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppAuthModule } from './app-core/auth/auth.module';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogConfig } from '@angular/material/dialog';
import { AppConfig } from './app-config.service';

export function initializeApp(appConfig: AppConfig) {
  return () => appConfig.load();
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AppCommonModule,
        FlexLayoutModule,
        AppAuthModule,
        SharedMaterialModule
    ],
    providers: [
        Title,
        AppConfig,
        { provide: APP_INITIALIZER,
          useFactory: initializeApp,
          deps: [AppConfig], multi: true },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        {provide: MAT_DIALOG_DEFAULT_OPTIONS,
        useValue: {
          ...new MatDialogConfig(),
          hasBackdrop: true, autoFocus: true, maxWidth: '100vw !important', width: '100%', height: '100%',
          panelClass: 'data-dialog-container'
        } as MatDialogConfig}
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
