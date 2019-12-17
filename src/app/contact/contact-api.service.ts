import {Injectable} from '@angular/core';
import {HttpApisService} from '../core/http-apis.service';
import {ContactDto} from '../models/contact.interface';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {SnackbarService} from '../core/snackbar.service';


@Injectable()
export class ContactApiService {
  readonly url = 'contacts'; // API controller name

  constructor(
    private _httpApis: HttpApisService,
    private _snackbarService: SnackbarService
  ) {}

  /**
   * API call to create contact information
   * @param data
   */
  createContact(data: ContactDto): Observable<ContactDto> {
    return this._httpApis.post<ContactDto>(this.url, data)
      .pipe(tap(() => this._snackbarService.openSnackBar({message: 'Contact created successfully!'})));
  }

  /**
   * API call to update contact information
   * @param data
   */
  updateContact(data: ContactDto) {
    return this._httpApis.put(`${this.url}/${data.id}`, data)
      .pipe(tap(() => this._snackbarService.openSnackBar({message: 'Contact updated successfully!'})));
  }

  /**
   * API call to change the contact status (Active/ Inactive)
   * @param contactId
   * @param status
   */
  changeContactStatus(contactId: number, status: boolean) {
    return this._httpApis.patch(`${this.url}/${contactId}`, {status: status})
      .pipe(tap(() => this._snackbarService.openSnackBar({message: 'Contact status has changed!'})));
  }

  /**
   * API call to get all contact information
   */
  getContacts(): Observable<ContactDto[]> {
    return this._httpApis.get<ContactDto[]>(this.url);
  }

  /**
   * API call to delete contact information
   * @param id
   */
  deleteContact(id: number) {
    return this._httpApis.delete(`${this.url}/${id}`)
      .pipe(tap(() => this._snackbarService.openSnackBar({message: 'Contact deleted successfully!'})));
  }
}
