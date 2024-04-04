import { Component, Input } from '@angular/core';
import {
  UntypedFormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { FormMode } from '../../helpers/forms/baseFormComponent';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { config } from 'app/layout/authorized/const';

@Component({
  selector: 'app-information-form',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.sass'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class InformationComponent {
  @Input() parentFormGroup: UntypedFormGroup;
  @Input() config: config = {};
}
