import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  BaseFormComponent,
  FormMode,
} from '../../../../shared/helpers/forms/baseFormComponent';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PolygonsRequested } from '../../../../store/polygons/polygons.actions';
import { FormBuilder } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../../../store/app.state';
import {
  IParcelResponse,
  ParcelsService,
} from '../../../../shared/services/parcels.service';
import { ParcelFormComponent } from '../parcel-form/parcel-form.component';
import { IUser } from '../../../../shared/services/user.service';
import { isEmpty } from 'lodash';
import { MatSnackBar } from '@angular/material/snack-bar';
import { selectUser } from '../../../../store/user/user.selectors';
import { PolygonsService } from '../../../../shared/services/polygons.service';
import {
  buildParcelsUpdatePayload,
  buildPolygonPayload,
} from '../parcels.utils';
import { forkJoin } from 'rxjs';
import { ActionBarActionComponent } from '../../../../shared/components/action-bar/action-bar-action/action-bar-action.component';
import { ActionBarComponent } from '../../../../shared/components/action-bar/action-bar.component';
import { SidebarService } from 'app/shared/services/sidebar.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { icons } from 'assets/icons/fortawesome';
import { config } from '../../const';

@Component({
  selector: 'app-edit-parcel',
  templateUrl: './edit-parcel.component.html',
  styleUrl: './edit-parcel.component.sass',
  standalone: true,
  imports: [
    ActionBarComponent,
    ActionBarActionComponent,
    RouterLink,
    ParcelFormComponent,
    FontAwesomeModule,
  ],
})
export class EditParcelComponent
  extends BaseFormComponent
  implements OnInit, AfterContentInit
{
  parcel: IParcelResponse;
  @ViewChild(ParcelFormComponent) parcelForm: ParcelFormComponent;
  config: config = {
    form: { mode: FormMode.Edit },
    tab: 'edit-parcel',
    map: { style: { 'height.vh': 75 } },
  };
  user: IUser;
  icons = icons;

  constructor(
    private route: ActivatedRoute,
    formBuilder: FormBuilder,
    public store: Store<IAppState>,
    private parcelService: ParcelsService,
    private polygonsService: PolygonsService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private sidebarService: SidebarService
  ) {
    super(formBuilder);
  }

  ngOnInit() {
    this.sidebarService.title.next('Edit Parcels');
    this.route.data.subscribe(parcel => {
      this.parcel = parcel['parcel'];
    });
  }

  ngAfterContentInit() {
    this.store.pipe(select(selectUser)).subscribe((result: IUser) => {
      this.user = result;
    });
  }

  save() {
    let emptyPolygons = isEmpty(
      this.parcelForm.form.controls.polygon.value.filter(
        (item: any) => item.deleted !== true
      )
    );

    if (
      (this.parcelForm.form.pristine && this.parcelForm.form.invalid) ||
      emptyPolygons
    ) {
      this.markAsTouched(this.parcelForm.form);
      this._snackBar
        .open('nu poti fara un poligon', 'cancel')
        ._dismissAfter(2000);
      return;
    }

    const payload = buildParcelsUpdatePayload(
      this.parcelForm.form.controls.name.value,
      parseInt(this.parcelForm.form.controls.topographic_number.value),
      Number(this.parcel.data.id)
    );

    let observableBatch = [];
    observableBatch.push(
      this.parcelService.update(Number(this.parcel.data.id), payload)
    );

    this.parcelForm.form.controls.polygon.value.map((polygon: any) => {
      if (polygon.id && polygon.edited) {
        observableBatch.push(
          this.polygonsService.updateParcelPolygon(
            Number(this.parcel.data.id),
            polygon.id,
            buildPolygonPayload(polygon, 'put', Number(this.parcel.data.id))
          )
        );
      } else if (polygon.id && polygon.deleted) {
        observableBatch.push(
          this.polygonsService.deleteParcelPolygon(
            Number(this.parcel.data.id),
            polygon.id
          )
        );
      } else if (!polygon.id) {
        observableBatch.push(
          this.polygonsService.createParcelPolygon(
            Number(this.parcel.data.id),
            buildPolygonPayload(polygon, 'create')
          )
        );
      }
    });

    forkJoin(observableBatch).subscribe(
      next => {
        this.store.dispatch(PolygonsRequested());
        this.router.navigate(['/parcels/parcels']);
      },
      error => {
        alert(error);
      }
    );
  }

  delete() {
    this.parcelService.delete(Number(this.parcel.data.id)).subscribe(
      result => {
        this.store.dispatch(PolygonsRequested());
        this.router.navigate(['/parcels/parcels']);
      },
      error => {
        this._snackBar.open(
          error.data.errors[0].detail + ' ' + error.status,
          'cancel'
        );
      }
    );
  }
}
