import { Injectable } from '@angular/core';
import { HttpWrapperService } from './http-wrapper.service';
import { Observable } from 'rxjs';
import { jsonToSearchParams } from '../helpers/search-param-query-encoder/search-param-query-encoder.service';

export interface IPolygon {
  type?: 'polygons';
  id?: string;
  links?: {
    self?: string;
  };
  attributes?: {
    coordinates?: string;
    parcel_id?: string;
    culture?: string;
    culture_id?: string;
  };
}

export interface IPolygonsResponse {
  data?: IPolygon[];
  included?: any;
}

@Injectable({
  providedIn: 'root',
})
export class PolygonsService {
  constructor(private httpWrapper: HttpWrapperService) {}

  getAll(filter?: any): Observable<IPolygonsResponse> {
    let params = filter ? jsonToSearchParams({ filter }) : [];
    return this.httpWrapper.get('/api/v1/polygons', { params });
  }

  getById(id: number, options?: any): Observable<IPolygonsResponse> {
    let params = options ? jsonToSearchParams({ options }) : [];
    return this.httpWrapper.get(`/api/v1/polygons/${id}`, { params });
  }

  updateParcelPolygon(
    parcelId: number,
    polygonId: number,
    payload: any
  ): Observable<IPolygonsResponse> {
    return this.httpWrapper.put(
      `/api/v1/parcels/${parcelId}/polygons/${polygonId}`,
      { data: payload }
    );
  }

  deleteParcelPolygon(
    parcelId: number,
    polygonId: number
  ): Observable<IPolygonsResponse> {
    return this.httpWrapper.delete(
      `/api/v1/parcels/${parcelId}/polygons/${polygonId}`
    );
  }

  createParcelPolygon(
    parcelId: number,
    payload: any
  ): Observable<IPolygonsResponse> {
    return this.httpWrapper.post(`/api/v1/parcels/${parcelId}/polygons`, {
      data: payload,
    });
  }
}
