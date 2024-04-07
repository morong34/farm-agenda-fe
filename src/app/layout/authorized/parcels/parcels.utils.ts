import { polygonCoordinates } from 'app/store/polygons/polygons.selectors';
import {
  IPolygon,
  IPolygonsResponse,
} from '../../../shared/services/polygons.service';
import { LatLng } from 'leaflet';

export function buildParcelsPayload(
  name: string,
  topographic_number: number,
  userID: number,
  parcels: any[]
) {
  return {
    type: 'parcels',
    attributes: {
      name,
      topographic_number,
    },
    relationships: {
      user: {
        data: {
          type: 'users',
          id: String(userID),
        },
      },
      polygons: {
        data: buildPolygonsPayload(parcels),
      },
    },
  };
}

export function buildParcelsUpdatePayload(
  name: string,
  topographic_number: number,
  id: number
) {
  return {
    type: 'parcels',
    id: String(id),
    attributes: {
      name,
      topographic_number,
    },
  };
}

export function buildPolygonsPayload(parcels: any) {
  const data = [];
  parcels?.forEach((polygons: string[][]) => {
    data.push({
      type: 'polygons',
      attributes: {
        coordinates: polygons['coordinates'],
      },
    });
  });
  return data;
}

export function buildPolygonPayload(
  polygon: any,
  type: string,
  parcel_id?: number
): IPolygon {
  let model = {};

  if (type === 'create') {
    model = {
      type: 'polygons',
      attributes: {
        coordinates: polygon.coordinates,
      },
    };
  } else {
    model = {
      type: 'polygons',
      id: String(polygon.id),
      attributes: {
        coordinates: polygon.coordinates,
        parcel_id: String(parcel_id),
      },
    };
  }

  return model;
}

export function mapPolygonsHandler(
  polygons: IPolygonsResponse
): polygonCoordinates[] {
  return polygons?.data.map((polygon: IPolygon) => {
    return {
      id: polygon?.id,
      coordinates: JSON.parse(polygon.attributes?.coordinates),
      parcelId: polygon.attributes?.parcel_id,
      culture: polygon.attributes?.culture,
      cultureId: polygon.attributes?.culture_id,
      clicked: false,
    };
  });
}

export function getCenter(polygon: any) {
  return new LatLng(polygon.coordinates[2][1],polygon.coordinates[2][0]);
}
