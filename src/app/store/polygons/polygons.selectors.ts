import { IAppState } from '../app.state';
import { createSelector } from '@ngrx/store';
import { IPolygonsState } from './polygons.state';
import {
  IPolygon,
  IPolygonsResponse,
} from '../../shared/services/polygons.service';
import { mapPolygonsHandler } from 'app/layout/authorized/parcels/parcels.utils';

export interface polygonCoordinates {
  id: string;
  coordinates: [];
  parcelId: string;
  culture: string;
  cultureId: string;
}

const polygonsState = (state: IAppState) => state.polygons;

export const selectPolygons = createSelector(
  polygonsState,
  (polygonsResponse: IPolygonsState) => polygonsResponse?.polygons
);

export const selectPolygonsCoordinates = createSelector(
  selectPolygons,
  (polygons: IPolygonsResponse): polygonCoordinates[] => {
    return mapPolygonsHandler(polygons);
  }
);

export const selectPolygonsCoorindatesWithoutCulture = createSelector(
  selectPolygonsCoordinates,
  (polygons: any): any =>
    polygons?.filter((polygon: polygonCoordinates) => !polygon.cultureId)
);

export const selectPolygonsCoorindatesWithCulture = createSelector(
  selectPolygonsCoordinates,
  (polygons: any): any =>
    polygons?.filter((polygon: polygonCoordinates) => polygon.cultureId)
);

export const selectPolygonsCoorindatesWithCultureDynamic = (
  culture_type: string
) =>
  createSelector(
    selectPolygonsCoorindatesWithCulture,
    (polygons: any): any =>
      polygons?.filter(
        (polygon: polygonCoordinates) => polygon.culture === culture_type
      )
  );

export const selectPolygonsCoordinatesFor = (ids: string[]) =>
  createSelector(selectPolygons, (polygons: IPolygonsResponse) => {
    return polygons?.data
      .filter(item => ids.includes(item.id))
      .map((polygon: IPolygon) => {
        return {
          id: polygon.id,
          coordinates: JSON.parse(polygon.attributes.coordinates),
          parcelId: polygon.attributes.parcel_id,
        };
      });
  });

export const selectPolygonsCoordinatesExcept = (ids: string[]) =>
  createSelector(selectPolygons, (polygons: IPolygonsResponse) => {
    return polygons?.data
      .filter(item => !ids.includes(item.id))
      .map((polygon: IPolygon) => {
        return {
          id: polygon.id,
          coordinates: JSON.parse(polygon.attributes.coordinates),
          parcelId: polygon.attributes.parcel_id,
        };
      });
  });

export const selectPolygonIdDynamicaly = (coordinates: string[][]) =>
  createSelector(selectPolygonsCoordinates, (polygons: any) =>
    polygons.filter((polygon: { id: string; coordinates: string[][] }) => {
      const d = polygon.coordinates === coordinates;
    })
  );
