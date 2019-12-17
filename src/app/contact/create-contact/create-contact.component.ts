import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {nameValidator, phoneNumberValidator} from './form-validator.validators';
import {ContactApiService} from '../contact-api.service';
import {ContactDto} from '../../models/contact.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-create-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.scss']
})
export class CreateContactComponent implements OnInit {

  contactFormGroup: FormGroup;
  isNew = true;
  contactDto: ContactDto;

  constructor(
    private _contactApiService: ContactApiService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.initializeFormGroup();
  }

  /**
   * Get form group controls
   */
  get fControl(): { [key: string]: AbstractControl } {
    return this.contactFormGroup.controls;
  }

  ngOnInit() {
    this._route.queryParams
      .pipe(
        filter(params => params.data),
        map(param => JSON.parse(param.data))
      )
      .subscribe(resp => {
        this.contactDto = resp;
        if (this.contactDto) {
          this.isNew = false;
          this.contactFormGroup.patchValue(this.contactDto);
        }
      });
    /* */
  }

  /**
   * Creating form group
   */
  initializeFormGroup() {
    this.contactFormGroup = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        nameValidator(new RegExp(/^[A-Za-z]+$/))
      ]),
      lastName: new FormControl('', [
        Validators.maxLength(50),
        nameValidator(new RegExp(/^[A-Za-z]+$/))
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      phoneNumber: new FormControl('', [
        Validators.required,
        phoneNumberValidator()
      ]),
      status: new FormControl(true),
      id: new FormControl()
    });
  }

  /**
   * API call to create contact information
   * @param data
   */
  createContact(data: ContactDto) {
    this._contactApiService.createContact(data)
      .subscribe(() => {
        this._router.navigate(['/']);
      });
  }

  /**
   * API call to update contact information
   * @param data
   */
  upDateContact(data: ContactDto) {
    this._contactApiService.updateContact(data)
      .subscribe(() => {
        this._router.navigate(['/']);
      });
  }

  /**
   * It will call when contact form will submit
   */
  onSubmit() {
    if (this.contactFormGroup.invalid) {
      this.markFormGroupTouched(this.contactFormGroup);
      return;
    }
    const contactFormData = this.contactFormGroup.value;
    if (this.isNew) {
      this.createContact(contactFormData);
    } else {
      this.upDateContact(contactFormData);
    }
  }

  /**
   * Form reset
   * @param formDirective
   */
  resetContactForm(formDirective: FormGroupDirective) {
    if (this.isNew) {
      this.contactFormGroup.reset();
      formDirective.resetForm();
    } else {
      this.contactFormGroup.patchValue(this.contactDto);
    }
  }

  /**
   * Marks all controls in a form group as touched
   * @param formGroup
   */
  private markFormGroupTouched(formGroup: FormGroup): void {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
