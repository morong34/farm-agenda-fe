import { Component, Input } from '@angular/core';
import { ICultureResponse } from '../../services/culture.service';
import { UntypedFormGroup } from '@angular/forms';
import { FormMode } from '../../helpers/forms/baseFormComponent';

@Component({
  selector: 'app-cultures-information',
  templateUrl: './cultures-information.component.html',
  styleUrls: ['./cultures-information.component.sass']
})
export class CulturesInformationComponent {
  @Input() culture: ICultureResponse;
  @Input() parentFormGroup: UntypedFormGroup;
  @Input() mode: FormMode;
}
