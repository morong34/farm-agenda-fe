import { IParcelResponse, IParcelsResponse } from '../../../shared/services/parcels.service';
import { IPolygon } from '../../../shared/services/polygons.service';

export interface dataTable {
  id: number;
  parcel_id: string;
  name: string;
  user_id: number;
}

export function createDataTable(payload: IParcelsResponse['data']): dataTable[] {
  let array = [];
  if (payload) {
    for (let item of payload) {
      array.push({ id: item.id, parcel_id: item.attributes.parcel_id, name: item.attributes.name, user_id: item.attributes.user_id });
    }
  }
  return array;
}

export function createPolygonsPayload(payload: IParcelsResponse['data']): { id: number; polygon: IPolygon[] }[] {
  let array = [];
  if (payload) {
    for (let item of payload) {
      array.push({ id: item.id, polygon: item.attributes.polygon });
    }
  }

  return array;
}

export function createTableInfo(value: any) {
  return value.map((value: [][], index: number) => {
    return { position: index, points: value[0].length };
  });
}

export function createTableInfoFromField(value: any) {
  return value.map((value: any, index: number) => {
    return { position: index, points: value.coordinates.length };
  });
}
