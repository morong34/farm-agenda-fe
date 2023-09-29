import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormMode } from '../../../../shared/helpers/forms/baseFormComponent';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { IUser } from '../../../../shared/services/user.service';
import { IAppState } from '../../../../store/app.state';
import { IParcelResponse } from '../../../../shared/services/parcels.service';
import { createTableInfo, createTableInfoFromField } from '../parcels.utils';
import { InformationComponent } from '../../../../shared/common/information-form/information.component';
import { addParcelTable } from '../consts';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { IPolygon } from '../../../../shared/services/polygons.service';
import {
  selectPolygonsCoordinates,
  selectPolygonsCoordinatesExcept,
  selectPolygonsCoordinatesFor
} from '../../../../store/polygons/polygons.selectors';
import { Observable } from 'rxjs';
import { isEmpty } from 'lodash';

@Component({
  selector: 'app-parcel-form',
  templateUrl: './parcel-form.component.html',
  styleUrls: ['./parcel-form.component.sass']
})
export class ParcelFormComponent implements OnInit {
  @ViewChild(InformationComponent) informationForm: InformationComponent;
  @ViewChild(TableComponent) table: TableComponent;
  @Input() mode = FormMode.Create;
  @Input() field: IParcelResponse;
  selectPolygonsCoordinatesSubscriptions$: Observable<IPolygon[]>;
  selectPolygonsCoordinatesToEditSubscriptions$: Observable<IPolygon[]>;
  user: IUser;
  form: FormGroup;
  polygons = [];

  constructor(public formBuilder: FormBuilder, private store: Store<IAppState>, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    if (this.mode === FormMode.Edit) {
      const ids = this.field.data.attributes.polygon.map((item) => String(item.id));
      this.selectPolygonsCoordinatesSubscriptions$ = this.store.pipe(select(selectPolygonsCoordinatesExcept(ids)));
      this.selectPolygonsCoordinatesToEditSubscriptions$ = this.store.pipe(select(selectPolygonsCoordinatesFor(ids)));
    } else {
      this.selectPolygonsCoordinatesSubscriptions$ = this.store.pipe(select(selectPolygonsCoordinates));
    }

    this.createForm();
  }

  get poligonIds(): FormArray {
    return this.form.get('polygon') as FormArray;
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: new FormControl(this.mode === FormMode.Edit ? this.field?.data?.attributes?.name : '', [Validators.required]),
      topographic_number: new FormControl(this.mode === FormMode.Edit ? this.field?.data?.attributes?.topographic_number : '', [
        Validators.required
      ]),
      polygon: new FormArray([], [Validators.required])
    });

    if (this.mode === FormMode.Edit) {
      this.field?.data?.attributes?.polygon.forEach((item: any) => {
        this.poligonIds.push(new FormControl(item.coordinates));
      });
      this.polygons = createTableInfoFromField(this.field.data.attributes.polygon);
      this.changeDetectorRef.detectChanges();
    }

    this.form.controls.polygon.valueChanges.subscribe((value) => {
      this.polygons = createTableInfo(value);
      this.changeDetectorRef.detectChanges();
    });
  }

  drawCreated(event: any) {
    this.poligonIds.push(new FormControl(event));
  }

  drawEdited(list: []) {
    this.poligonIds.clear();
    list.forEach((element: any, index: number) => {
      this.poligonIds.push(new FormControl(element));
    });
  }

  drawDeleted(list: any) {
    if (isEmpty(list)) {
      this.polygons = [];
    }
    this.poligonIds.clear();
    list.forEach((element: any, index: number) => {
      this.poligonIds.push(new FormControl(element));
    });
  }

  get tableStyle() {
    return { 'min-width': '15% !important', border: 4, 'white-space': 'nowrap', 'border-spacing': 0, 'table-layout': 'fixed' };
  }

  protected readonly addParcelsColumn = addParcelTable;
}
