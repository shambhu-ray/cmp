import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ContactsComponent} from './contacts.component';
import {ContactModule} from '../contact.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {SnackbarService} from '../../core/snackbar.service';
import {MatSnackBarModule} from '@angular/material';
import {environment} from '../../../environments/environment';
import {BASE_API_URL} from '../../core/http-apis.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('ContactsComponent', () => {
  let component: ContactsComponent;
  let fixture: ComponentFixture<ContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        BrowserAnimationsModule,
        ContactModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MatSnackBarModule
      ],
      providers: [
        SnackbarService,
        {
          provide: BASE_API_URL,
          useValue: environment.baseApiUrl
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
