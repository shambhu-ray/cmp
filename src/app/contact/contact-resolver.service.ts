import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {ContactDto} from '../models/contact.interface';
import {Observable} from 'rxjs';
import {ContactApiService} from './contact-api.service';
import {map, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable()
export class ContactResolverService implements Resolve<ContactDto[]> {

  constructor(private _contactApiService: ContactApiService, private _router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ContactDto[] | null> {
    return this._contactApiService.getContacts()
      .pipe(
        map(resp => resp.length > 0 ? resp : null),
        tap(resp => !resp ? this.navigate() : null, err => this.navigate())
      );
  }

  /**
   * Navigate to create contact route
   */
  navigate() {
    this._router.navigate(['/contacts/create']);
  }
}
