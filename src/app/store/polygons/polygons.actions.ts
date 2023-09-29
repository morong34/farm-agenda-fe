import { createAction, props } from '@ngrx/store';
import { IPolygonsResponse } from '../../shared/services/polygons.service';

export enum PolygonsActions {
  PolygonsRequested = '[Polygons] Polygons Requested',
  PolygonsLoaded = '[Polygons] Polygons Loaded',
  PolygonsError = '[Polygons] Polygons Error'
}

export const PolygonsRequested = createAction(PolygonsActions.PolygonsRequested);
export const PolygonsLoaded = createAction(PolygonsActions.PolygonsLoaded, props<{ polygons: IPolygonsResponse }>());
export const PolygonsError = createAction(PolygonsActions.PolygonsError, props<{ error: string }>());
