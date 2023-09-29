import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseFormComponent, FormMode } from '../../../../shared/helpers/forms/baseFormComponent';
import { CulturesInformationComponent } from '../../../../shared/common/cultures-information/cultures-information.component';
import { FormCulturesComponent } from '../culture-form/form-cultures.component';
import { FormBuilder } from '@angular/forms';
import { CultureService, ICulturesResponse } from '../../../../shared/services/culture.service';
import { ActivatedRoute, Router } from '@angular/router';
import { buildCulturesPayload } from '../cultures.utils';
import { ParcelsRequested } from '../../../../store/parcels/parcels.actions';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../store/app.state';

@Component({
  selector: 'app-add-cultures',
  templateUrl: './add-cultures.component.html',
  styleUrls: ['./add-cultures.component.sass']
})
export class AddCulturesComponent extends BaseFormComponent implements OnInit {
  mode = FormMode.Create;
  @ViewChild(FormCulturesComponent) formCulturesComponent: FormCulturesComponent;
  parcels: any;

  constructor(
    formBuilder: FormBuilder,
    protected cultureService: CultureService,
    private route: ActivatedRoute,
    public store: Store<IAppState>,
    private router: Router
  ) {
    super(formBuilder);
  }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.parcels = data?.parcels;
    });
  }

  save() {
    if (this.formCulturesComponent.form.pristine && this.formCulturesComponent.form.invalid) {
      this.markAsTouched(this.formCulturesComponent.form);
      return;
    }

    const data = buildCulturesPayload(this.formCulturesComponent.form.getRawValue(), this.formCulturesComponent.user.id);

    this.cultureService.create(data).subscribe(
      (result) => {
        this.store.dispatch(ParcelsRequested());
        this.router.navigate(['/cultures']);
      },
      (error) => {
        alert(error);
      }
    );
  }

  delete() {}

  protected readonly FormMode = FormMode;
}
