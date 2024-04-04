import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  IParcelsResponse,
  ParcelsService,
} from '../../shared/services/parcels.service';
import { Store } from '@ngrx/store';
import { IAppState } from '../app.state';
import {
  ParcelsError,
  ParcelsLoaded,
  ParcelsRequested,
} from './parcels.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class ParcelsEffects {
  constructor(
    private actions$: Actions,
    private parcelsService: ParcelsService,
    private store: Store<IAppState>
  ) {}

  parcelsRequested$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ParcelsRequested),
      mergeMap(({}) => {
        return this.parcelsService.getAll().pipe(
          map((parcels: IParcelsResponse) => ParcelsLoaded({ parcels })),
          catchError(error => of(ParcelsError(error)))
        );
      })
    );
  });
}
