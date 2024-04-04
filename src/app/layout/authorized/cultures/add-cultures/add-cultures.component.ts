import { Component, OnInit, ViewChild } from '@angular/core';
import { FormMode } from '../../../../shared/helpers/forms/baseFormComponent';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { CultureService } from '../../../../shared/services/culture.service';
import { Router, RouterLink } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../../../../store/app.state';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActionBarComponent } from 'app/shared/components/action-bar/action-bar.component';
import { ActionBarActionComponent } from 'app/shared/components/action-bar/action-bar-action/action-bar-action.component';
import { SidebarService } from 'app/shared/services/sidebar.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { icons } from 'assets/icons/fortawesome';
import { config } from '../../const';
import { includes, isEmpty } from 'lodash';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MapComponent } from 'app/shared/components/map/map.component';
import { Observable } from 'rxjs';
import { IPolygon } from 'app/shared/services/polygons.service';
import { selectPolygonsCoorindatesWithoutCulture } from 'app/store/polygons/polygons.selectors';
import { PolygonsRequested } from 'app/store/polygons/polygons.actions';
import { planingCulturesPayload } from '../cultures.utils';
import { LoaderComponent } from 'app/shared/components/loader/loader.component';

@Component({
  selector: 'app-add-cultures',
  templateUrl: './add-cultures.component.html',
  styleUrl: './add-cultures.component.sass',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    RouterLink,
    NgIf,
    ActionBarComponent,
    ActionBarActionComponent,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MapComponent,
    AsyncPipe,
    LoaderComponent,
  ],
})
export class AddCulturesComponent implements OnInit {
  form: UntypedFormGroup;
  config: config = {
    tab: 'add-culture',
    form: { mode: FormMode.Create },
    map: {
      polygonClickable: true,
      showMarkerPolygon: true,
      style: { 'height.vh': 74 },
    },
  };
  icons = icons;
  formReady: boolean = false;

  selectPolygonsWithoutCultureCoordinatesSubscriptions$: Observable<IPolygon[]>;

  @ViewChild(MapComponent) map: MapComponent;

  constructor(
    public formBuilder: FormBuilder,
    protected cultureService: CultureService,
    public store: Store<IAppState>,
    private sidebarService: SidebarService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.sidebarService.title.next('Add Cultures');
    this.selectPolygonsWithoutCultureCoordinatesSubscriptions$ =
      this.store.pipe(select(selectPolygonsCoorindatesWithoutCulture));

    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      culture_type: new FormControl('', [Validators.required]),
    });
    this.formReady = true;
  }

  save() {
    let fields = this.map.polygonsSelected;
    if (this.form.invalid || isEmpty(fields)) {
      isEmpty(this.form.value.polygons)
        ? this._snackBar.open('ceva nu ai pus', 'cancel', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 2000,
          })
        : '';
      return;
    }

    const payload = planingCulturesPayload(
      this.form.controls.culture_type.value,
      fields
    );

    this.cultureService.create(payload).subscribe(
      () => {
        this.store.dispatch(PolygonsRequested());
        this.map.cleanUpMap(true);
        this.router.navigate(['/cultures']);
      },
      error => {
        alert(error.data);
      }
    );
  }
  protected readonly FormMode = FormMode;
}
