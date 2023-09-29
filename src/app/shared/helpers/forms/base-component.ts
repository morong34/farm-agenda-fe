import { Directive, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Directive()
export class BaseComponent implements OnChanges, OnInit {
  @Input() inputName: string;
  @Input() controlName: string;
  @Input() parentFormGroup: FormGroup;
  @Input() tooltip: string;
  @Input() label: string;
  @Input() hideLabel = false;

  isControlRequired: boolean;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    this.isControlRequired = this.calculateIsControlRequired();
  }

  ngOnInit() {
    this.isControlRequired = this.calculateIsControlRequired();
  }

  calculateIsControlRequired(): boolean {
    if (this.control?.validator) {
      const validator = this.control.validator({} as AbstractControl);
      if (validator && validator.required) {
        return true;
      }
    }
  }

  get control() {
    return this.parentFormGroup?.get(this.controlName);
  }
}
