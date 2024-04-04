import { Injectable } from '@angular/core';
import { HttpWrapperService } from './http-wrapper.service';
import { Observable } from 'rxjs';
import { IPolygon } from './polygons.service';

export interface IParcelsAttributes {
  name?: string;
  topographic_number?: string;
  parcel_id?: string;
  user_id?: string;
  polygon?: IPolygon[];
  culture?: string;
}

export interface IParcelsParams {
  type?: string;
  id?: string;
  attributes?: {
    name?: string;
    topographic_number?: number;
  };
  relationships?: {
    user?: {
      data?: {
        type?: string;
        id?: string;
      };
    };
    polygons?: {
      data?: IPolygon[];
    };
  };
}

export interface IParcelResponse {
  data: {
    type?: string;
    id?: string;
    attributes?: IParcelsAttributes;
    relationships?: {
      user?: {
        data: {
          id?: string;
          type?: string;
        };
      };
      polygons?: {
        data: {
          id?: string;
          attributes?: {
            coordinates: [];
          };
        };
      };
    };
  };
}

export interface IParcelsResponse {
  data?: [
    {
      id?: number;
      type?: string;
      attributes?: IParcelsAttributes;
      relationships?: {
        user?: {
          data: {
            id?: string;
            type?: string;
          };
        };
        polygons?: {
          data: {
            id?: string;
            attributes?: {
              coordinates: [];
            };
          };
        }[];
      };
    },
  ];
}

@Injectable({
  providedIn: 'root',
})
export class ParcelsService {
  constructor(private httpWrapper: HttpWrapperService) {}

  getAll(params?: any): Observable<IParcelsResponse> {
    return this.httpWrapper.get('/api/v1/parcels', params);
  }

  getById(id: number): Observable<IParcelResponse> {
    return this.httpWrapper.get(`/api/v1/parcels/${id}`);
  }

  create(payload: any): Observable<IParcelsResponse> {
    return this.httpWrapper.post('/api/v1/parcels', { data: payload });
  }

  update(id: number, payload: IParcelsParams): Observable<IParcelsResponse> {
    return this.httpWrapper.put(`/api/v1/parcels/${id}`, { data: payload });
  }

  delete(id: number) {
    return this.httpWrapper.delete(`/api/v1/parcels/${id}`);
  }
}
