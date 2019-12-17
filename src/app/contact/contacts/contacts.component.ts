import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import {of, Subject} from 'rxjs';
import {debounceTime, delay, distinctUntilChanged, flatMap, map} from 'rxjs/operators';
import {ContactDto} from '../../models/contact.interface';
import {ContactApiService} from '../contact-api.service';
import {ConfirmationDialogService} from '../../shared/confirmation-dialog/confirmation-dialog.service';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  displayedColumns: string[] = ['firstName', 'email', 'phoneNumber', 'status', 'more'];
  dataSource: MatTableDataSource<ContactDto> = new MatTableDataSource<ContactDto>();
  contactDtos: ContactDto[] = [];
  keyUp = new Subject<string>();

  constructor(
    private _contactApiService: ContactApiService,
    private _confirmationDialogService: ConfirmationDialogService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.contactDtos = this._route.snapshot.data['contactDtos'];
    this.dataSource.data = this.contactDtos;
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit(): void {
    this.keyUp.pipe(
      map((event: any) => event.target.value),
      debounceTime(300),
      distinctUntilChanged(),
      flatMap(search => of(search).pipe(delay(300)))
    ).subscribe(value => this.applyFilter(value));
  }

  /**
   * Navigate to edit route
   * @param data
   */
  editContact(data: ContactDto) {
    this._router.navigate(['/contacts/edit'], {queryParams: {data: JSON.stringify(data)}});
  }

  /**
   * Delete contact information
   * @param id
   */
  async deleteContact(id: number) {
    const result = await this._confirmationDialogService.openDialog({
      title: 'Delete Contact',
      message: 'This item will be deleted. Are you sure want to continue?'
    }).afterClosed().toPromise();
    if (result) {
      this._contactApiService.deleteContact(id)
        .subscribe(() => {
          if (this.contactDtos.length <= 1) {
            this._router.navigate(['/contacts/create']);
            return;
          }
          this.updateDataSource(id);
        });
    }
  }

  /**
   * Change status of contact (Active/ Inactive)
   * @param contact
   */
  changeContactStatus(contact: ContactDto) {
    this._contactApiService.changeContactStatus(contact.id, !contact.status)
      .subscribe(() => {
        contact.status = !contact.status;
      });
  }

  /**
   * Update Mat-table data source
   * @param id
   */
  updateDataSource(id) {
    const index = this.dataSource.data.findIndex(item => item.id === id);
    if (index > -1) {
      this.contactDtos.splice(index, 1);
      this.dataSource = new MatTableDataSource(this.contactDtos);
      this.paginator.length = this.contactDtos.length;
    }
  }

  /**
   * Filter function for searching data in Mat-Table
   * @param filterValue
   */
  applyFilter(filterValue: string): void {
    this.dataSource.filter = (filterValue.trim()).toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

