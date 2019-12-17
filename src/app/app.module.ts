import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpInterceptorService} from './core/http-interceptor.service';
import {API_REQUEST_SPINNER, BASE_API_URL} from './core/http-apis.service';
import {environment} from '../environments/environment';
import {MatProgressSpinnerModule, MatSnackBarModule} from '@angular/material';
import {Subject} from 'rxjs';
import {ContactModule} from './contact/contact.module';

export const apiRequestSpinner: Subject<boolean> = new Subject<boolean>();

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    ContactModule,
    MatSnackBarModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    {
      provide: BASE_API_URL,
      useValue: environment.baseApiUrl
    },
    {
      provide: API_REQUEST_SPINNER,
      useValue: apiRequestSpinner
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
