import { AfterContentInit, Component, ViewChild } from '@angular/core';
import {
  BaseFormComponent,
  FormMode,
} from '../../../../shared/helpers/forms/baseFormComponent';
import { ParcelFormComponent } from '../parcel-form/parcel-form.component';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ParcelsService } from '../../../../shared/services/parcels.service';
import { select, Store } from '@ngrx/store';
import { selectUser } from '../../../../store/user/user.selectors';
import { IUser } from '../../../../shared/services/user.service';
import { IAppState } from '../../../../store/app.state';
import { PolygonsRequested } from '../../../../store/polygons/polygons.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isEmpty } from 'lodash';
import { buildParcelsPayload } from '../parcels.utils';
import { ActionBarActionComponent } from '../../../../shared/components/action-bar/action-bar-action/action-bar-action.component';
import { ActionBarComponent } from '../../../../shared/components/action-bar/action-bar.component';
import { SidebarService } from 'app/shared/services/sidebar.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { icons } from 'assets/icons/fortawesome';
import { config } from '../../const';

@Component({
  selector: 'app-add-parcels',
  templateUrl: './add-parcels.component.html',
  styleUrl: './add-parcels.component.sass',
  standalone: true,
  imports: [
    ActionBarComponent,
    ActionBarActionComponent,
    RouterLink,
    ParcelFormComponent,
    FontAwesomeModule,
  ],
})
export class AddParcelsComponent
  extends BaseFormComponent
  implements AfterContentInit
{
  @ViewChild(ParcelFormComponent) parcelForm: ParcelFormComponent;
  config: config = {
    form: { mode: FormMode.Create },
    tab: 'add-parcels',
    map: { style: { 'height.vh': 75 } },
  };
  user: IUser;
  icons = icons;

  constructor(
    formBuilder: FormBuilder,
    public store: Store<IAppState>,
    private parcelService: ParcelsService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private sidebarService: SidebarService
  ) {
    super(formBuilder);
  }

  ngAfterContentInit() {
    this.sidebarService.title.next('Add Parcels');
    this.store.pipe(select(selectUser)).subscribe((result: IUser) => {
      this.user = result;
    });
  }

  save() {
    let polygons = this.parcelForm.form.controls.polygon.value;
    if (
      (this.parcelForm.form.pristine && this.parcelForm.form.invalid) ||
      isEmpty(polygons)
    ) {
      this.markAsTouched(this.parcelForm.form);

      isEmpty(polygons)
        ? this._snackBar
            .open('nu poti fara un poligon', 'cancel')
            ._dismissAfter(2000)
        : '';
      return;
    }

    const payload = buildParcelsPayload(
      this.parcelForm.form.controls.name.value,
      parseInt(this.parcelForm.form.controls.topographic_number.value),
      this.user.id,
      this.parcelForm.form.controls.polygon.value
    );
    this.parcelService.create(payload).subscribe(
      () => {
        this.store.dispatch(PolygonsRequested());
        this.router.navigate(['/parcels/parcels']);
      },
      error => {
        alert(error);
      }
    );
  }

  protected readonly FormMode = FormMode;
}
