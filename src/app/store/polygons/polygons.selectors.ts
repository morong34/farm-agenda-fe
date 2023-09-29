import { IAppState } from '../app.state';
import { createSelector } from '@ngrx/store';
import { IPolygonsState } from './polygons.state';
import { IPolygon, IPolygonsResponse } from '../../shared/services/polygons.service';

const polygonsState = (state: IAppState) => state.polygons;

export const selectPolygons = createSelector(polygonsState, (polygonsResponse: IPolygonsState) => polygonsResponse?.polygons);

export const selectPolygonsCoordinates = createSelector(selectPolygons, (polygons: IPolygonsResponse) => {
  return polygons?.data.map((polygon: IPolygon) => {
    return { id: polygon.id, coordinates: JSON.parse(polygon.attributes.coordinates), parcelId: polygon.attributes.parcel_id };
  });
});

export const selectPolygonsCoordinatesFor = (ids: string[]) =>
  createSelector(selectPolygons, (polygons: IPolygonsResponse) => {
    return polygons?.data
      .filter((item) => ids.includes(item.id))
      .map((polygon: IPolygon) => {
        return { id: polygon.id, coordinates: JSON.parse(polygon.attributes.coordinates), parcelId: polygon.attributes.parcel_id };
      });
  });

export const selectPolygonsCoordinatesExcept = (ids: string[]) =>
  createSelector(selectPolygons, (polygons: IPolygonsResponse) => {
    return polygons?.data
      .filter((item) => !ids.includes(item.id))
      .map((polygon: IPolygon) => {
        return { id: polygon.id, coordinates: JSON.parse(polygon.attributes.coordinates), parcelId: polygon.attributes.parcel_id };
      });
  });

export const selectPolygonIdDynamicaly = (coordinates: string[][]) =>
  createSelector(selectPolygonsCoordinates, (polygons: any) =>
    polygons.filter((polygon: { id: string; coordinates: string[][] }) => {
      const d = polygon.coordinates === coordinates;
      debugger;
    })
  );
