import { createAction, props } from '@ngrx/store';
import { IParcelsResponse } from '../../shared/services/parcels.service';

export enum ParcelsActions {
  ParcelsRequested = '[Parcels] Parcels Requested',
  ParcelsLoaded = '[Parcels] Parcels Loaded',
  ParcelsError = '[Parcels] Parcels Error',
}

export const ParcelsRequested = createAction(ParcelsActions.ParcelsRequested);

export const ParcelsLoaded = createAction(
  ParcelsActions.ParcelsLoaded,
  props<{ parcels: IParcelsResponse }>()
);

export const ParcelsError = createAction(
  ParcelsActions.ParcelsError,
  props<{ error: string }>()
);
