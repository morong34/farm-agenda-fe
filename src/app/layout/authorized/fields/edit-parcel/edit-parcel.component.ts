import { AfterContentInit, Component, ViewChild } from '@angular/core';
import { BaseFormComponent, FormMode } from '../../../../shared/helpers/forms/baseFormComponent';
import { ActivatedRoute, Router } from '@angular/router';
import { buildParcelsUpdatePayload } from '../../../../shared/components/map/parcels-utils';
import { PolygonsRequested } from '../../../../store/polygons/polygons.actions';
import { FormBuilder } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../../../store/app.state';
import { IParcelsParams, ParcelsService } from '../../../../shared/services/parcels.service';
import { ParcelFormComponent } from '../parcel-form/parcel-form.component';
import { IUser } from '../../../../shared/services/user.service';
import { isEmpty } from 'lodash';
import { MatSnackBar } from '@angular/material/snack-bar';
import { selectUser } from '../../../../store/user/user.selectors';

@Component({
  selector: 'app-edit-parcel',
  templateUrl: './edit-parcel.component.html',
  styleUrls: ['./edit-parcel.component.sass']
})
export class EditParcelComponent extends BaseFormComponent implements AfterContentInit {
  parcel: IParcelsParams;
  @ViewChild(ParcelFormComponent) parcelForm: ParcelFormComponent;
  mode = FormMode.Edit;
  user: IUser;

  constructor(
    private route: ActivatedRoute,
    formBuilder: FormBuilder,
    public store: Store<IAppState>,
    private parcelService: ParcelsService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    super(formBuilder);
  }

  ngAfterContentInit() {
    this.store.pipe(select(selectUser)).subscribe((result: IUser) => {
      this.user = result;
    });
  }

  save() {
    let polygons = this.parcelForm.form.controls.polygon.value.filter((_: any, index: number) =>
      this.parcelForm.table.selection.selected.map((item) => item.position).includes(index)
    );

    if ((this.parcelForm.form.pristine && this.parcelForm.form.invalid) || isEmpty(polygons)) {
      this.markAsTouched(this.parcelForm.form);

      isEmpty(polygons) ? this._snackBar.open('nu poti fara un poligon', 'cancel')._dismissAfter(2000) : '';
      return;
    }

    const payload = buildParcelsUpdatePayload(
      this.parcelForm.form.controls.name.value,
      parseInt(this.parcelForm.form.controls.topographic_number.value),
      this.user?.id,
      polygons,
      parseInt(this.parcel.data.id)
    );
    debugger;
    this.parcelService.update(parseInt(this.parcel.data.id), payload).subscribe(
      (result) => {
        debugger;
        this.store.dispatch(PolygonsRequested());
        this.router.navigate(['/fields/parcels']);
      },
      (error) => {
        alert(error);
      }
    );
  }

  delete() {
    this.parcelService.delete(parseInt(this.parcel.data.id)).subscribe(
      (result) => {
        debugger;
        this.store.dispatch(PolygonsRequested());
        this.router.navigate(['/fields/parcels']);
      },
      (error) => {
        this._snackBar.open(error.data.errors[0].detail + ' ' + error.status, 'cancel');
      }
    );
  }

  ngOnInit() {
    this.route.data.subscribe((parcel) => {
      this.parcel = parcel['field'];
    });
  }
}
