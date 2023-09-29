import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { keys } from 'lodash';

const markAsTouched = (groupOrControl: FormGroup | FormArray | AbstractControl) => {
  if (!groupOrControl) {
    return;
  }

  if (groupOrControl instanceof FormControl) {
    groupOrControl.markAsTouched();
    return;
  }

  keys((groupOrControl as FormGroup | FormArray).controls).map((field) => {
    const control = groupOrControl.get(field);

    if (control instanceof FormControl) {
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormGroup) {
      markAsTouched(control);
    } else if (control instanceof FormArray) {
      control.controls.forEach((item: FormGroup) => markAsTouched(item));
    }
  });
};

export const FormHelpers = {
  markAsTouched
};
