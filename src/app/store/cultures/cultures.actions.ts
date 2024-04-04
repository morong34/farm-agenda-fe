import { createAction, props } from '@ngrx/store';
import { ICulturesResponse } from '../../shared/services/culture.service';

export enum CulturesActions {
  CulturesRequested = '[Cultures] Cultures Requested',
  CulturesLoaded = '[Cultures] Cultures Loaded',
  CulturesRemoved = '[Cultures] Cultures Removed',
  CulturesError = '[Cultures] Cultures Error',
}

export const CulturesRequested = createAction(
  CulturesActions.CulturesRequested
);

export const CulturesLoaded = createAction(
  CulturesActions.CulturesLoaded,
  props<{ cultures: ICulturesResponse }>()
);

export const CulturesRemoved = createAction(CulturesActions.CulturesRemoved);

export const CulturesError = createAction(
  CulturesActions.CulturesError,
  props<{ error: string }>()
);
