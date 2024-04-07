import {
  ChangeDetectorRef,
  Component,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../../../store/app.state';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MapComponent } from 'app/shared/components/map/map.component';
import { Observable, withLatestFrom } from 'rxjs';
import {
  IPolygon,
  PolygonsService,
} from 'app/shared/services/polygons.service';
import { AsyncPipe } from '@angular/common';
import { ActionBarActionComponent } from '../../../../shared/components/action-bar/action-bar-action/action-bar-action.component';
import { ActionBarComponent } from '../../../../shared/components/action-bar/action-bar.component';
import {
  selectPolygonsCoordinates,
  selectPolygonsCoorindatesWithCulture,
} from 'app/store/polygons/polygons.selectors';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { icons } from 'assets/icons/fortawesome';
import { SidebarService } from 'app/shared/services/sidebar.service';
import { FormMode } from 'app/shared/helpers/forms/baseFormComponent';
import { config } from '../../const';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormGroup,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CultureService } from 'app/shared/services/culture.service';
import { PolygonsRequested } from 'app/store/polygons/polygons.actions';
import { mapPolygonsHandler } from '../../parcels/parcels.utils';
import { checkValuePresent } from '../cultures.utils';
import { LoaderComponent } from 'app/shared/components/loader/loader.component';

@Component({
  selector: 'app-cultures',
  templateUrl: './cultures.component.html',
  styleUrl: './cultures.component.sass',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    RouterLink,
    MapComponent,
    AsyncPipe,
    ActionBarComponent,
    ActionBarActionComponent,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    LoaderComponent,
  ],
})
export class CulturesComponent implements OnInit {
  form: UntypedFormGroup;
  formReady: boolean;
  config: config = {
    form: {
      mode: FormMode.View,
    },
    tab: 'cultures',
    map: {
      style: { 'height.vh': 78 },
      showMarkerPolygon: true,
      polygonClickable: true,
    },
  };

  @ViewChild(MapComponent) map: MapComponent;
  selectPolygonsCoordinatesSubscriptions$: Observable<IPolygon[]>;
  icons = icons;
  deleteActivated: boolean = false;
  editActivated: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    private store: Store<IAppState>,
    private sidebarService: SidebarService,
    private _snackBar: MatSnackBar,
    private zone: NgZone,
    private router: Router,
    private cultureService: CultureService,
    private changeDetectorRef: ChangeDetectorRef,
    private polygonService: PolygonsService
  ) {}

  ngOnInit() {
    this.sidebarService.title.next('Cultures');
    setTimeout(() => {
      this.selectPolygonsCoordinatesSubscriptions$ = this.store.pipe(
        select(selectPolygonsCoordinates)
      );
    }, 200);

    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      culture_type: new FormControl(''),
    });
    this.formReady = true;
  }

  get filters() {
    return Object.entries(this.form.value).reduce(
      (a, [k, v]) => (v ? ((a[k] = v), a) : a),
      {}
    );
  }

  doSearch(buttonAction?: boolean) {
    if (checkValuePresent(this.form.value)) {
      this.polygonService.getAll(this.filters).subscribe(results => {
        this.map.pushPolygon(mapPolygonsHandler(results));
      });
    } else if (!checkValuePresent(this.form.value) && buttonAction) {
      this.store
        .pipe(
          withLatestFrom(
            this.store.select(selectPolygonsCoorindatesWithCulture)
          )
        )
        .subscribe((polygons) => this.map.pushPolygon(polygons));
    } else {
      this.store
        .pipe(withLatestFrom(this.store.select(selectPolygonsCoordinates)))
        .subscribe(( polygons) => this.map.pushPolygon(polygons[1]));
    }
  }

  polygonClick(event: any) {
    if (this.deleteActivated) {
      this.zone.run(() => {
        this.cultureService.delete(parseInt(event.polygon.cultureId)).subscribe(
          () => {
            this.clearState();
            this.store.dispatch(PolygonsRequested());
            this.map.cleanUpMap(true);
          },
          error => {
            this._snackBar.open(
              error.data.errors[0].detail + ' ' + error.status,
              'cancel'
            );
          }
        );
      });
    } else {
      this.zone.run(() => {
        this.router.navigate([`/cultures/${event.polygon.cultureId}/edit`]);
      });
    }
  }

  updateDelete() {
    this.doSearch(true);
    this._snackBar
      .open('Sterge o culturea', 'cancel', {
        verticalPosition: 'top',
        horizontalPosition: 'right',
      })
      .onAction()
      .subscribe(() => {
        this.cancel();
      });
    this.deleteActivated = !this.deleteActivated;
  }

  cancel() {
    this.deleteActivated = false;
    this.editActivated = false;
    this.polygonService.getAll(this.filters).subscribe(results => {
      this.map.pushPolygon(mapPolygonsHandler(results));
    });
  }

  get showMode() {
    return this.deleteActivated || this.editActivated;
  }

  protected clearState() {
    this._snackBar.dismiss();
    this.editActivated = false;
    this.deleteActivated = false;
    this.changeDetectorRef.detectChanges();
  }
}
