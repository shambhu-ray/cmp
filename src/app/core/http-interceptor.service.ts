import {Inject, Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {API_REQUEST_SPINNER} from './http-apis.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  private _spinner: Subject<boolean>;

  constructor(@Inject(API_REQUEST_SPINNER) apiRequestSpinner: Subject<boolean>) {
    this._spinner = apiRequestSpinner;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._spinner.next(true);
    return next.handle(request)
      .pipe(finalize(() => this._spinner.next(false)));
  }
}
