import { Subscription } from 'rxjs';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { FormHelpers } from './form-helpers';
import { forEach, isArray, isEmpty, isObject } from 'lodash';

export class BaseFormController {
  formChanged = false;
  saveChangesCallBack: () => {};
  formGroupSubscription: Subscription;

  form: FormGroup;

  resetWatchChanges() {
    this.formChanged = false;
  }

  markAsTouched(groupOrControl: FormGroup | FormArray | AbstractControl) {
    FormHelpers.markAsTouched(groupOrControl);
  }

  objectToFormData(data: { [key: string]: any }, formData = new FormData(), prefix?: string) {
    forEach(data, (value, key) => {
      const fieldKey: string = this.getFormDataKeyForObject(key, prefix);
      if (this.isNestedValue(value)) {
      }
    });
  }

  private getFormDataKeyForObject(key: string, prefix?: string): string {
    return !isEmpty(prefix) ? `${prefix}[${key}]` : key;
  }

  private isFile(value) {
    return value instanceof File || value instanceof Blob;
  }

  private isDate(value) {
    return value instanceof Date;
  }

  private isBigNumber(value) {
    return isObject(value) && value.constructor.name === 'Big';
  }

  private isNestedValue(value) {
    return isObject(value) && !isArray(value) && !this.isFile(value) && !this.isDate(value) && !this.isBigNumber(value);
  }

  private handleArrayToFormData(array: unknown[], formData: FormData, prefix?) {
    forEach(array, (value) => {
      const key = `${prefix}[]`;
      if (this.isNestedValue(value)) {
        this.objectToFormData(value, formData, key);
      } else {
        formData.append(key, value as string | Blob);
      }
    });
  }

  private watchFormGroupChanges(formGroup: FormGroup) {
    this.formGroupSubscription = formGroup.valueChanges.subscribe(() => {
      this.formChanged = true;
    });
  }
}
