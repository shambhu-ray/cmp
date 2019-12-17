import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {AbstractControl, ValidationErrors} from '@angular/forms';
import {FromControlErrorsEnum} from '../../models/from-control-errors.enum';

@Component({
  selector: 'app-error-message',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span>{{message}}</span>`
})
export class ErrorMessageComponent {
  errors: ValidationErrors;
  message = '';

  @Input()
  set controlName(control: AbstractControl) {
    this.errors = control.errors;
    this.getErrors(control);
  }

  /**
   * Finding errors in form control
   * @param formController
   */
  getErrors(formController: AbstractControl) {
    if (formController.hasError(FromControlErrorsEnum.REQUIRED)) {
      this.setMessage(FromControlErrorsEnum.REQUIRED);

    } else if (formController.hasError(FromControlErrorsEnum.EMAIL)) {
      this.setMessage(FromControlErrorsEnum.EMAIL);

    } else if (formController.hasError(FromControlErrorsEnum.NAME)) {
      this.setMessage(FromControlErrorsEnum.NAME);

    } else if (formController.hasError(FromControlErrorsEnum.PHONE_NUMBER)) {
      this.setMessage(FromControlErrorsEnum.PHONE_NUMBER);

    } else if (formController.hasError(FromControlErrorsEnum.MAX_LENGTH)) {
      this.setMessage(FromControlErrorsEnum.MAX_LENGTH);

    } else if (formController.hasError(FromControlErrorsEnum.MIN_LENGTH)) {
      this.setMessage(FromControlErrorsEnum.MIN_LENGTH);
    }
  }

  /**
   * Set the error message according to error type
   * @param errorParam
   */
  setMessage(errorParam: string): void {
    switch (errorParam) {
      case FromControlErrorsEnum.REQUIRED: {
        this.message = 'You must enter a value.';
        break;
      }
      case FromControlErrorsEnum.EMAIL: {
        this.message = 'Not a valid email.';
        break;
      }
      case FromControlErrorsEnum.NAME: {
        this.message = 'Name should be alphabetic characters only.';
        break;
      }
      case FromControlErrorsEnum.PHONE_NUMBER: {
        this.message = 'The phone number you entered does not seem to be valid.';
        break;
      }
      case FromControlErrorsEnum.MIN_LENGTH: {
        this.message = `This field must be at least ${this.errors.minlength.requiredLength} characters long.`;
        break;
      }
      case FromControlErrorsEnum.MAX_LENGTH: {
        this.message = `This field should not be greater than ${this.errors.maxlength.requiredLength} characters long.`;
        break;
      }
    }
  }

}
