import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormMode } from '../../../../shared/helpers/forms/baseFormComponent';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { IUser } from '../../../../shared/services/user.service';
import { IAppState } from '../../../../store/app.state';
import { IParcelResponse } from '../../../../shared/services/parcels.service';
import { InformationComponent } from '../../../../shared/common/information-form/information.component';
import { IPolygon } from '../../../../shared/services/polygons.service';
import {
  selectPolygonsCoordinates,
  selectPolygonsCoordinatesExcept,
  selectPolygonsCoordinatesFor,
} from '../../../../store/polygons/polygons.selectors';
import { Observable } from 'rxjs';
import { find } from 'lodash';
import { AsyncPipe } from '@angular/common';
import { MapComponent } from '../../../../shared/components/map/map.component';
import { config } from '../../const';
import { LoaderComponent } from 'app/shared/components/loader/loader.component';

@Component({
  selector: 'app-parcel-form',
  templateUrl: './parcel-form.component.html',
  styleUrl: './parcel-form.component.sass',
  standalone: true,
  imports: [InformationComponent, MapComponent, AsyncPipe, LoaderComponent],
})
export class ParcelFormComponent implements OnInit, OnChanges {
  @ViewChild(InformationComponent) informationForm: InformationComponent;
  @Input() config: config = {};
  @Input() parcel: IParcelResponse;
  selectPolygonsCoordinatesSubscriptions$: Observable<IPolygon[]>;
  selectPolygonsCoordinatesToEditSubscriptions$: Observable<IPolygon[]>;
  user: IUser;
  form: FormGroup;
  formIsReady: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
    if (this.config.form.mode === FormMode.Create) {
      this.selectPolygonsCoordinatesSubscriptions$ = this.store.pipe(
        select(selectPolygonsCoordinates)
      );

      this.createForm();
      this.formIsReady = true;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes?.parcel?.currentValue &&
      this.config.form.mode === FormMode.Edit
    ) {
      const ids = this.parcel.data.attributes.polygon.map(item =>
        String(item.id)
      );
      this.selectPolygonsCoordinatesSubscriptions$ = this.store.pipe(
        select(selectPolygonsCoordinatesExcept(ids))
      );
      this.selectPolygonsCoordinatesToEditSubscriptions$ = this.store.pipe(
        select(selectPolygonsCoordinatesFor(ids))
      );
      this.createForm();
      this.formIsReady = true;
    }
  }

  get poligonIds(): FormArray {
    return this.form.get('polygon') as FormArray;
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: new FormControl(
        this.config.form.mode === FormMode.Edit
          ? this.parcel?.data?.attributes?.name
          : '',
        [Validators.required]
      ),
      topographic_number: new FormControl(
        this.config.form.mode === FormMode.Edit
          ? this.parcel?.data?.attributes?.topographic_number
          : '',
        [Validators.required]
      ),
      polygon: new FormArray([], [Validators.required]),
    });

    if (this.config.form.mode === FormMode.Edit) {
      this.parcel?.data?.attributes?.polygon.forEach((item: any) => {
        this.poligonIds.push(
          new FormControl({ coordinates: item.coordinates, id: item.id })
        );
      });
    }
  }

  drawCreated(event: any) {
    this.poligonIds.push(new FormControl({ coordinates: event }));
  }

  drawEdited(polygon: any) {
    if (find(this.poligonIds.value, { id: Number(polygon.id) })) {
      let item = this.poligonIds.value.find(
        (item: any) => item.id === Number(polygon.id)
      );
      item.coordinates = polygon.coordinates;
      item.edited = true;
    } else {
      // TODO: nu stim cum sa cautam fara id, coordonatele se modifica
    }
  }

  drawDeleted(polygon: any) {
    this.poligonIds.value.find(
      (item: any) => item.id === Number(polygon.polygonId)
    ).deleted = true;
  }
}
