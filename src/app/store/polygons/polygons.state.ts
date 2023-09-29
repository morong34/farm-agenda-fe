import { IPolygonsResponse } from '../../shared/services/polygons.service';

export const initialPolygonsState: IPolygonsState = {
  polygons: null
};

export interface IPolygonsState {
  polygons: IPolygonsResponse;
}
