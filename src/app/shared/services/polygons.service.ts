import { Injectable } from '@angular/core';
import { HttpWrapperService } from './http-wrapper.service';
import { Observable } from 'rxjs';

export interface IPolygon {
  type?: 'Polygons';
  id?: string;
  links?: {
    self?: string;
  };
  attributes?: {
    coordinates?: string;
    parcel_id?: number;
  };
}

export interface IPolygonsResponse {
  data?: IPolygon[];
  included?: any;
}

@Injectable({
  providedIn: 'root'
})
export class PolygonsService {
  constructor(private httpWrapper: HttpWrapperService) {}

  getAll(): Observable<IPolygonsResponse> {
    return this.httpWrapper.get('/api/v1/polygons');
  }

  getById(id: number, params?: any): Observable<IPolygonsResponse> {
    return this.httpWrapper.get(`/api/v1/polygons/${id}`, { params });
  }
}
