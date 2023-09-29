import { ICultureState, initialCulturesState } from './cultures.state';
import { ICulturesResponse } from '../../shared/services/culture.service';
import { createReducer, on } from '@ngrx/store';
import { CulturesLoaded, CulturesRemoved } from './cultures.actions';

const setCultures = (state: ICultureState, { cultures }: { cultures: ICulturesResponse }) => ({ ...state, cultures });

const removeCultures = (state: ICultureState) => ({ ...state, cultures: null });

const _culturesReducer = createReducer<ICultureState>(
  initialCulturesState,
  on(CulturesLoaded, setCultures),
  on(CulturesRemoved, removeCultures)
);

export function culturesReducer(state: ICultureState, action): ICultureState {
  return _culturesReducer(state, action);
}
