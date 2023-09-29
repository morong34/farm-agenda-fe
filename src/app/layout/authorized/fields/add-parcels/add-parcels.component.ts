import { AfterContentInit, Component, ViewChild } from '@angular/core';
import { BaseFormComponent, FormMode } from '../../../../shared/helpers/forms/baseFormComponent';
import { ParcelFormComponent } from '../parcel-form/parcel-form.component';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { IParcelsResponse, ParcelsService } from '../../../../shared/services/parcels.service';
import { buildParcelsPayload } from '../../../../shared/components/map/parcels-utils';
import { select, Store } from '@ngrx/store';
import { selectUser } from '../../../../store/user/user.selectors';
import { IUser } from '../../../../shared/services/user.service';
import { IAppState } from '../../../../store/app.state';
import { PolygonsRequested } from '../../../../store/polygons/polygons.actions';

@Component({
  selector: 'app-add-parcels',
  templateUrl: './add-parcels.component.html',
  styleUrls: ['./add-parcels.component.sass']
})
export class AddParcelsComponent extends BaseFormComponent implements AfterContentInit {
  @ViewChild(ParcelFormComponent) parcelForm: ParcelFormComponent;
  fields: IParcelsResponse;
  mode = FormMode.Create;
  user: IUser;

  constructor(formBuilder: FormBuilder, public store: Store<IAppState>, private parcelService: ParcelsService, private router: Router) {
    super(formBuilder);
  }

  ngAfterContentInit() {
    this.store.pipe(select(selectUser)).subscribe((result: IUser) => {
      this.user = result;
    });
  }

  delete() {}
  save() {
    if (this.parcelForm.form.pristine && this.parcelForm.form.invalid) {
      this.markAsTouched(this.parcelForm.form);
      return;
    }

    const payload = buildParcelsPayload(
      this.parcelForm.form.controls.name.value,
      parseInt(this.parcelForm.form.controls.topographic_number.value),
      this.user.id,
      this.parcelForm.form.controls.polygon.value.filter((_: any, index: number) =>
        this.parcelForm.table.selection.selected.map((item) => item.position).includes(index)
      )
    );
    this.parcelService.create(payload).subscribe(
      (result) => {
        this.store.dispatch(PolygonsRequested());
        this.router.navigate(['/fields/parcels']);
      },
      (error) => {
        alert(error);
      }
    );
  }

  protected readonly FormMode = FormMode;
}
