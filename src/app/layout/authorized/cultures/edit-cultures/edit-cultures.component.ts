import { Component } from '@angular/core';
import { FormMode } from '../../../../shared/helpers/forms/baseFormComponent';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-cultures',
  templateUrl: './edit-cultures.component.html',
  styleUrls: ['./edit-cultures.component.sass']
})
export class EditCulturesComponent {
  culture: any;
  mode = FormMode.Edit;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe((culture) => {
      this.culture = culture;
    });
  }
}
