import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IAppState } from '../../../../store/app.state';
import { select, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { selectPolygonsCoordinates } from '../../../../store/polygons/polygons.selectors';
import { Observable } from 'rxjs';
import { IPolygon } from '../../../../shared/services/polygons.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-parcels',
  templateUrl: './parcels.component.html',
  styleUrls: ['./parcels.component.sass']
})
export class ParcelsComponent implements OnInit {
  deleteActivated: boolean = false;
  editActivated: boolean = false;
  selectPolygonsCoordinatesSubscriptions$: Observable<IPolygon[]>;

  constructor(
    private store: Store<IAppState>,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.selectPolygonsCoordinatesSubscriptions$ = this.store.pipe(select(selectPolygonsCoordinates));
  }

  polygonClick(event: any) {
    if (this.editActivated) {
      this._snackBar.dismiss();
      this.router.navigate([`/fields/${event.polygon.parcelId}/edit`]);
    } else if (this.deleteActivated) {
      this._snackBar.dismiss();
      // TODO delete-ul
    } else {
      alert('aici o sa fie un modal cu un info');
      // TODO aici modalul pentru info mici
    }
  }

  save() {}

  updateEdit() {
    this._snackBar
      .open('Selecteaza un polygon', 'cancel')
      .onAction()
      .subscribe(($event) => {
        this.cancel();
      });
    this.editActivated = !this.editActivated;
    this.changeDetectorRef.detectChanges();
  }
  updateDelete() {
    this._snackBar
      .open('Selecteaza un polygon', 'cancel')
      .onAction()
      .subscribe(($event) => {
        this.cancel();
      });
    this.deleteActivated = !this.deleteActivated;
    this.changeDetectorRef.detectChanges();
  }

  cancel() {
    this.deleteActivated = false;
    this.editActivated = false;
  }

  get showMode() {
    return this.deleteActivated || this.editActivated;
  }
}
