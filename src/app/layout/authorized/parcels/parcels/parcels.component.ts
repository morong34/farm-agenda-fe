import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { IAppState } from '../../../../store/app.state';
import { select, Store } from '@ngrx/store';
import { Router, RouterLink } from '@angular/router';
import { selectPolygonsCoordinates } from '../../../../store/polygons/polygons.selectors';
import { Observable } from 'rxjs';
import { IPolygon } from '../../../../shared/services/polygons.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ParcelsService } from 'app/shared/services/parcels.service';
import { PolygonsRequested } from 'app/store/polygons/polygons.actions';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ParcelsInformationModalComponent } from '../../../../shared/common/parcels-information-modal/parcels-information-modal.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { MapComponent } from '../../../../shared/components/map/map.component';
import { ActionBarActionComponent } from '../../../../shared/components/action-bar/action-bar-action/action-bar-action.component';
import { ActionBarComponent } from '../../../../shared/components/action-bar/action-bar.component';
import { SidebarService } from 'app/shared/services/sidebar.service';
import { icons } from 'assets/icons/fortawesome';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormMode } from 'app/shared/helpers/forms/baseFormComponent';
import { config } from '../../const';

@Component({
  selector: 'app-parcels',
  templateUrl: './parcels.component.html',
  styleUrl: './parcels.component.sass',
  standalone: true,
  imports: [
    ActionBarComponent,
    ActionBarActionComponent,
    RouterLink,
    MapComponent,
    AsyncPipe,
    NgIf,
    FontAwesomeModule,
  ],
})
export class ParcelsComponent implements OnInit {
  config: config = {
    form: { mode: FormMode.View },
    tab: 'parcels',
    map: { polygonClickable: true },
  };
  deleteActivated: boolean = false;
  editActivated: boolean = false;
  selectPolygonsCoordinatesSubscriptions$: Observable<IPolygon[]>;
  icons = icons;

  constructor(
    private store: Store<IAppState>,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private _snackBar: MatSnackBar,
    private parcelService: ParcelsService,
    private modalService: NgbModal,
    private zone: NgZone,
    private sideBarService: SidebarService
  ) {}

  ngOnInit() {
    this.sideBarService.title.next('Parcels');
    this.selectPolygonsCoordinatesSubscriptions$ = this.store.pipe(
      select(selectPolygonsCoordinates)
    );
  }

  polygonClick(event: any) {
    if (this.editActivated) {
      this._snackBar.dismiss();
      this.zone.run(() => {
        this.router.navigate([`/parcels/${event.polygon.parcelId}/edit`]);
      });
    } else if (this.deleteActivated) {
      this.parcelService.delete(parseInt(event.polygon.parcelId)).subscribe(
        () => {
          this.clearState();
          this.store.dispatch(PolygonsRequested());
        },
        error => {
          this._snackBar.open(
            error.data.errors[0].detail + ' ' + error.status,
            'cancel'
          );
        }
      );
    } else {
      this.zone.run(() => {
        const ref: NgbModalRef = this.modalService.open(
          ParcelsInformationModalComponent,
          { ariaLabelledBy: 'modal-basic-title', centered: true }
        );
        ref.componentInstance.fieldId = event.polygon.parcelId;
        ref.result
          .then(reason => {
            switch (reason) {
              case 'edit':
                this.router.navigate([
                  `/parcels/${event.polygon.parcelId}/edit`,
                ]);
                break;
              case 'add_culture':
                this.router.navigate([`/cultures/add`]);
                break;
              default:
                break;
            }
          })
          .catch(() => {});
      });
    }
  }

  updateEdit() {
    this._snackBar
      .open('Selecteaza un polygon', 'cancel', {
        verticalPosition: 'top',
        horizontalPosition: 'right',
      })
      .onAction()
      .subscribe(() => {
        this.cancel();
      });
    this.editActivated = !this.editActivated;
  }

  updateDelete() {
    this._snackBar
      .open('Selecteaza un polygon', 'cancel', {
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
