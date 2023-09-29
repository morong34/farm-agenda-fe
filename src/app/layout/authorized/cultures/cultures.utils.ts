import { ICulturesResponse } from '../../../shared/services/culture.service';

export interface dataTable {
  id: number;
  name: string;
  culture_id: number;
  parcel_id: number;
  culture_type: string;
  variety: string;
  user_id: number;
  sowing_date: number;
  harvest_date: string;
}

export function createDataTable(payload: ICulturesResponse['data']): dataTable[] {
  let array = [];
  if (payload) {
    for (let item of payload) {
      array.push({
        id: item.id,
        name: item.attributes.name,
        culture_id: item.attributes.culture_id,
        culture_type: item.attributes.culture_type,
        variety: item.attributes.variety,
        user_id: item.attributes.user_id,
        harvest_date: item.attributes.harvest_date,
        sowing_date: item.attributes.sowing_date
      });
    }
  }
  return array;
}

export function buildCulturesPayload(form: any, userId: number) {
  return {
    type: 'culture',
    attributes: {
      name: form.name,
      culture_type: form.culture_type,
      variety: form.variety,
      harvest_date: form.harvest_date,
      sowing_date: form.sowing_date,
      parcel_id: '5'
    },
    relationships: {
      parcel: {
        data: {
          type: 'parcels',
          // id: form.parcel_id,
          id: '5'
        }
      },
      polygons: {
        // data: buildPolygonIdsPayload(form)
        data: [
          { type: 'polygons', id: '9' },
          { type: 'polygons', id: '10' }
        ]
      }
    }
  };
}

export function buildPolygonIdsPayload(parcels: any) {
  const data = [];
  parcels?.forEach((coordinates: string[][]) => {
    data.push({
      type: 'polygons',
      attributes: {
        id: coordinates
      }
    });
  });
  return data;
}
