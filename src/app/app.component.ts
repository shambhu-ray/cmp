import {Component, Inject} from '@angular/core';
import {API_REQUEST_SPINNER} from './core/http-apis.service';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  spinner: Observable<boolean>;

  constructor(@Inject(API_REQUEST_SPINNER) apiRequestSpinner: Subject<boolean>) {
    this.spinner = apiRequestSpinner;
  }
}
