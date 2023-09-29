import { IParcelsResponse } from '../../shared/services/parcels.service';

export const initialParcelsState: IParcelsState = {
  parcels: null
};

export interface IParcelsState {
  parcels: IParcelsResponse;
}
