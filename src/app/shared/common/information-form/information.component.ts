import { Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { FormMode } from '../../helpers/forms/baseFormComponent';

@Component({
  selector: 'app-information-form',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.sass']
})
export class InformationComponent {
  @Input() fields: string;
  @Input() parentFormGroup: UntypedFormGroup;
  @Input() mode: FormMode;
}
