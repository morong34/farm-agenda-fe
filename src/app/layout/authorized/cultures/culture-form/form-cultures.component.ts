import { AfterContentInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectUser } from '../../../../store/user/user.selectors';
import { IUser } from '../../../../shared/services/user.service';
import { FormArray, FormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { IAppState } from '../../../../store/app.state';
import { FormMode } from '../../../../shared/helpers/forms/baseFormComponent';
import { ICultureResponse } from '../../../../shared/services/culture.service';
import { CulturesInformationComponent } from '../../../../shared/common/cultures-information/cultures-information.component';
import { addCultureTable } from '../consts';
import { createPolygonsPayload } from '../../fields/parcels.utils';
import { IParcelsResponse } from '../../../../shared/services/parcels.service';
import { isEmpty } from 'lodash';
import { IPolygon } from '../../../../shared/services/polygons.service';

@Component({
  selector: 'app-culture-form',
  templateUrl: './form-cultures.component.html',
  styleUrls: ['./form-cultures.component.sass']
})
export class FormCulturesComponent implements AfterContentInit, OnInit, AfterContentInit {
  @ViewChild(CulturesInformationComponent) cultureInformationForm: CulturesInformationComponent;
  @Input() mode = FormMode.Create;
  @Input() culture: ICultureResponse;
  @Input() parcels: IParcelsResponse;
  user: IUser;
  dataSource: any;
  form: UntypedFormGroup;
  polygons = [];
  mapParcels: { id: number; polygon: IPolygon[] }[] = [];

  constructor(private store: Store<IAppState>, private formBuilder: FormBuilder) {}

  ngOnInit() {
    if (!isEmpty(this.parcels) && this.mode === FormMode.Create) {
      this.mapParcels = createPolygonsPayload(this.parcels?.data);
    }

    this.createForm();
  }

  createDataSource(value: any[]) {
    let result = [];
    value.map((item: any, index: any) => result.push({ position: index, points: item.length }));
    return result;
  }

  ngAfterContentInit() {
    this.store.pipe(select(selectUser)).subscribe((result: IUser) => {
      this.user = result;
    });
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: new FormControl(this.mode === FormMode.Edit ? this.culture?.data?.attributes?.name : '', [Validators.required]),
      parcel_id: new FormControl(this.mode === FormMode.Edit ? this.culture?.data?.attributes?.parcel_id : '', [Validators.required]),
      user_id: new FormControl(this.mode === FormMode.Edit ? this.culture?.data?.attributes?.user_id : '', [Validators.required]),
      culture_type: new FormControl(this.mode === FormMode.Edit ? this.culture?.data?.attributes?.culture_type : '', [Validators.required]),
      variety: new FormControl(this.mode === FormMode.Edit ? this.culture?.data?.attributes?.variety : '', [Validators.required]),
      sowing_date: new FormControl(this.mode === FormMode.Edit ? this.culture?.data?.attributes?.sowing_date : '', [Validators.required]),
      harvest_date: new FormControl(this.mode === FormMode.Edit ? this.culture?.data?.attributes?.harvest_date : '', [Validators.required]),
      polygon: new FormArray([], [Validators.required]),
      polygon_ids: new FormControl(this.mode === FormMode.Edit ? this.culture?.data?.attributes?.polygon_ids : '', [Validators.required])
    });
  }

  get tableStyle() {
    return { 'min-width': '15% !important', border: 4, 'white-space': 'nowrap', 'border-spacing': 0, 'table-layout': 'fixed' };
  }

  get mapStyle() {
    return { 'height.vh': 55, 'width.vh': 90 };
  }

  protected readonly FormMode = FormMode;
  protected readonly addCultureColumn = addCultureTable;
}
