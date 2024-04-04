import { initialParcelsState, IParcelsState } from './parcels.state';
import { ParcelsLoaded } from './parcels.actions';
import { IParcelsResponse } from '../../shared/services/parcels.service';
import { createReducer, on } from '@ngrx/store';

const setParcels = (
  state: IParcelsState,
  { parcels }: { parcels: IParcelsResponse }
) => ({ ...state, parcels });

const removeParcels = (state: IParcelsState) => ({ ...state, parcels: null });

const _parcelsReducer = createReducer<IParcelsState>(
  initialParcelsState,
  on(ParcelsLoaded, setParcels)
);

export function parcelsReducer(state: IParcelsState, action): IParcelsState {
  return _parcelsReducer(state, action);
}
