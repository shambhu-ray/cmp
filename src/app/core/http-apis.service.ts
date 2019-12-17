import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpResponseModel} from '../models/http-response.interface';
import {SnackbarService} from './snackbar.service';

export const BASE_API_URL = new InjectionToken<string>('BASE_API_URL');
export const API_REQUEST_SPINNER = new InjectionToken<Subject<boolean>>('API_REQUEST_SPINNER');

@Injectable({
  providedIn: 'root'
})
export class HttpApisService {

  private _baseUrl: string;

  constructor(
    private _http: HttpClient,
    private _snackbarService: SnackbarService,
    @Inject(BASE_API_URL) baseUrl: string
  ) {
    this._baseUrl = baseUrl;
  }

  /**
   * GET request
   * @param url
   * @param headers
   * @param params
   */
  public get<T>(url: string, headers?: HttpHeaders, params?: HttpParams): Observable<T> {
    return this._http.get<T>(this._baseUrl + url, {params: params, headers: this.getHeaders(headers)})
      .pipe(catchError(this.handleError));
  }

  /**
   * POST request
   * @param url
   * @param requestBody
   * @param headers
   */
  public post<T>(url: string, requestBody: object, headers?: HttpHeaders): Observable<T> {
    return this._http.post<T>(this._baseUrl + url, requestBody, {headers: this.getHeaders(headers)})
      .pipe(catchError(this.handleError));
  }

  /**
   * DELETE request
   * @param url
   * @param headers
   */
  public delete<T>(url: string, headers?: HttpHeaders): Observable<T> {
    return this._http.delete<T>(this._baseUrl + url, {headers: this.getHeaders(headers)})
      .pipe(catchError(this.handleError));
  }

  /**
   * PATCH request
   * @param url
   * @param requestBody
   * @param headers
   */
  public patch<T>(url: string, requestBody: object, headers?: HttpHeaders): Observable<T> {
    return this._http.patch(this._baseUrl + url, requestBody, {headers: this.getHeaders(headers)})
      .pipe(catchError(this.handleError));
  }

  /**
   * PUT request
   * @param url
   * @param requestBody
   * @param headers
   */
  public put<T>(url: string, requestBody: object, headers?: HttpHeaders): Observable<T> {
    return this._http.put<T>(this._baseUrl + url, requestBody, {headers: this.getHeaders(headers)})
      .pipe(catchError(this.handleError));
  }

  private getHeaders(headers?: HttpHeaders): HttpHeaders {
    return headers ? headers :
      new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
  }

  /**
   * Error handler
   * @param response
   */
  private handleError = (response: HttpErrorResponse): Observable<any> => {
    const errorResponse: HttpResponseModel = {
      statusCode: response.status,
      message: response.error ?
        response.error.message ?
          response.error.message :
          response.message :
        response.message
    };
    this._snackbarService.openSnackBar(errorResponse);
    return throwError(response);
  }

}
