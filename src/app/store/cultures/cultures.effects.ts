import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { IAppState } from '../app.state';
import {
  CultureService,
  ICulturesResponse,
} from '../../shared/services/culture.service';
import {
  CulturesError,
  CulturesLoaded,
  CulturesRequested,
} from './cultures.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class CulturesEffects {
  constructor(
    private actions$: Actions,
    private culturesService: CultureService,
    private store: Store<IAppState>
  ) {}

  culturesRequested$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CulturesRequested),
      mergeMap(({}) => {
        return this.culturesService.getAll().pipe(
          map((cultures: ICulturesResponse) => CulturesLoaded({ cultures })),
          catchError(err => of(CulturesError))
        );
      })
    );
  });
}
