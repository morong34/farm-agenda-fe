import { initialPolygonsState, IPolygonsState } from './polygons.state';
import { IPolygonsResponse } from '../../shared/services/polygons.service';
import { createReducer, on } from '@ngrx/store';
import { PolygonsLoaded } from './polygons.actions';

const setPolygons = (
  state: IPolygonsState,
  { polygons }: { polygons: IPolygonsResponse }
) => ({ ...state, polygons });
const removePolygons = (state: IPolygonsState) => ({
  ...state,
  polygons: null,
});

const _polygonsReducer = createReducer<IPolygonsState>(
  initialPolygonsState,
  on(PolygonsLoaded, setPolygons)
);

export function polygonsReducer(state: IPolygonsState, action): IPolygonsState {
  return _polygonsReducer(state, action);
}
