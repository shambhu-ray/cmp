import {MatSnackBar} from '@angular/material';
import {Injectable} from '@angular/core';
import {HttpResponseModel} from '../models/http-response.interface';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(httpResponseModel: HttpResponseModel) {
    this._snackBar.open(httpResponseModel.message, undefined, {
      duration: 4000,
    });
  }
}
