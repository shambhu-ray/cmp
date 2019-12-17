import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

/**
 * Return validation function
 */
export const phoneNumberValidator = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const numberRegex = new RegExp(/\d{10}$/);
    if (control.value) {
      const test = control.value.match(numberRegex);
      return (!test || (test && test.index > 0)) ? {phonenumber: {phonenumber: 'invalid'}} : null;
    }
    return null;
  };
};

/**
 * Return validation function
 * @param regExp
 */
export const nameValidator = (regExp: RegExp): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value) {
      const test = control.value.match(regExp);
      return (!test || (test && test.index > 0)) ? {name: {name: 'invalid'}} : null;
    }
    return null;
  };
};

