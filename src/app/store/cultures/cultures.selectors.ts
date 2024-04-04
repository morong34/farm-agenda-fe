import { IAppState } from '../app.state';
import { createSelector } from '@ngrx/store';
import { ICultureState } from './cultures.state';

const culturesSate = (state: IAppState) => state.cultures;

export const selectCultures = createSelector(
  culturesSate,
  (culturesSate: ICultureState) => culturesSate.cultures
);
