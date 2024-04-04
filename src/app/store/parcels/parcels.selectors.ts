import { IAppState } from '../app.state';
import { createSelector } from '@ngrx/store';
import { IParcelsState } from './parcels.state';

const parcelsState = (state: IAppState) => state.parcels;

export const selectParcels = createSelector(
  parcelsState,
  (parcelsResponse: IParcelsState) => parcelsResponse?.parcels
);
