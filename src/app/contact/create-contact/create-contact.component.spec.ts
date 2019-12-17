import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateContactComponent} from './create-contact.component';
import {CreateContactModule} from './create-contact.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ContactApiService} from '../contact-api.service';
import {MatSnackBarModule} from '@angular/material';
import {SnackbarService} from '../../core/snackbar.service';
import {BASE_API_URL} from '../../core/http-apis.service';
import {environment} from '../../../environments/environment';

describe('CreateContactComponent', () => {
  let component: CreateContactComponent;
  let fixture: ComponentFixture<CreateContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        BrowserAnimationsModule,
        CreateContactModule,
        RouterTestingModule,
        HttpClientTestingModule,
        MatSnackBarModule
      ],
      providers: [
        ContactApiService,
        SnackbarService,
        {
          provide: BASE_API_URL,
          useValue: environment.baseApiUrl
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
