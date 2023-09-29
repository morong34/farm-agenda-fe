import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { BaseFormController } from './BaseFormController';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { forEach, get } from 'lodash';

export enum FormMode {
  Edit = 0,
  Create = 1,
  View = 2
}

@Directive()
export class BaseFormComponent extends BaseFormController {
  @Output() onFormReady = new EventEmitter();
  @Input() mode: FormMode = FormMode.Create;

  constructor(protected formBuilder: FormBuilder) {
    super();
  }

  protected generateControl(
    field: string,
    validations?: ValidatorFn | ValidatorFn[],
    defaultValue?,
    options: { disabled?: boolean } = {},
    location?: string
  ): FormControl {
    return this.formBuilder.control(
      {
        value: this.getField(location || field, defaultValue),
        disabled: this.isViewMode() || options.disabled
      },
      validations
    );
  }

  protected getField(field: string, defaultValue?: ''): string | boolean | number {
    return field;
  }

  isCreateMode() {
    return this.mode === FormMode.Create;
  }

  isViewMode() {
    return this.mode === FormMode.View;
  }

  isEditMode() {
    return this.mode === FormMode.Edit;
  }

  isInvalid(group, controlName): boolean {
    if (!group) {
      return false;
    }

    const control = group.controls[controlName];
    return control.invalid && control.touched;
  }

  getFieldValue(filed: string) {
    return get(this.form, `controls.${filed}.value`);
  }

  markFieldAsTouched(field: string) {
    const control = this.form.get(field);
    if (control instanceof FormControl) {
      control.markAsTouched({ onlySelf: true });
    }
  }

  markAllFieldsAsTouched(form?: FormGroup) {
    const controls = form ? form.controls : this.form.controls;
    forEach(controls, (control) => {
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      }
    });
  }

  setErrorsOnField(field: string, errors: ValidationErrors | null) {
    const control = this.form.get(field);
    if (control instanceof FormControl) {
      control.setErrors(errors);
    }
  }

  isFormInvalid(form?: FormGroup) {
    const invalid = [];
    const controls = form ? form.controls : this.form.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid.length > 0;
  }

  getDirtyValues(form: any): { [key: string]: string } {
    const dirtyValues = {};
    Object.keys(form.controls).forEach((key) => {
      const currentControl = form.controls[key];

      if (currentControl.dirty) {
        if (currentControl.controls) {
          dirtyValues[key] = this.getDirtyValues(currentControl);
        } else {
          dirtyValues[key] = currentControl.value;
        }
      }
    });

    return dirtyValues;
  }
}
