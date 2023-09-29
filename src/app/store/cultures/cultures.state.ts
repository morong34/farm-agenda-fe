import { ICulturesResponse } from '../../shared/services/culture.service';

export const initialCulturesState: ICultureState = {
  cultures: null
};

export interface ICultureState {
  cultures: ICulturesResponse;
}
