import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  IPolygonsResponse,
  PolygonsService,
} from '../../shared/services/polygons.service';
import { IAppState } from '../app.state';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of } from 'rxjs';
import {
  PolygonsError,
  PolygonsLoaded,
  PolygonsRequested,
} from './polygons.actions';

@Injectable()
export class PolygonsEffects {
  constructor(
    private actions$: Actions,
    private polygonsService: PolygonsService,
    private store: Store<IAppState>
  ) {}

  polygonsRequested$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PolygonsRequested),
      mergeMap(({}) => {
        return this.polygonsService.getAll().pipe(
          map((polygons: IPolygonsResponse) => {
            return PolygonsLoaded({ polygons });
          }),
          catchError(err => of(PolygonsError(err)))
        );
      })
    );
  });
}
