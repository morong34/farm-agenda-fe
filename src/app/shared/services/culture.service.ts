import { Injectable } from '@angular/core';
import { HttpWrapperService } from './http-wrapper.service';
import { Observable } from 'rxjs';
import { IParcelResponse } from './parcels.service';

export interface ICultureAttributes {
  name?: string;
  culture_id?: string;
  parcel_id?: number;
  culture_type?: string;
  variety?: string;
  user_id?: number;
  sowing_date?: string;
  harvest_date?: string;
  polygon_ids?: number[];
}

export interface ICulture {
  id?: string;
  type: 'cultures';
  links?: {
    self: string;
  };
  attributes?: ICultureAttributes;
  relationships?: {
    parcel?: {
      links?: {
        self: string;
        related: string;
      };
    };
    polygon?: {
      links?: {
        self: string;
        related: string;
      };
    };
  };
}

export interface ICulturesResponse {
  data: ICulture[];
}

export interface ICultureResponse {
  data: {
    id?: string;
    type: 'cultures';
    links?: {
      self: string;
    };
    attributes?: ICultureAttributes;
    relationships?: {
      parcel?: {
        links?: {
          self: string;
          related: string;
        };
      };
      polygon?: {
        links?: {
          self: string;
          related: string;
        };
      };
    };
  };
  included?: IParcelResponse['data'][];
}

@Injectable({ providedIn: 'root' })
export class CultureService {
  constructor(private httpWrapper: HttpWrapperService) {}
  defaultInclude = 'parcel,polygon';

  getAll(): Observable<ICulturesResponse> {
    return this.httpWrapper.get('/api/v1/cultures');
  }

  getCulturesForUser(id: number): Observable<ICulturesResponse> {
    return this.httpWrapper.get(`/api/v1/${id}/cultures`);
  }

  getById(id: number): Observable<ICultureResponse> {
    return this.httpWrapper.get(`/api/v1/cultures/${id}`, { params: { include: 'parcel' } });
  }

  create(payload): Observable<ICultureResponse> {
    return this.httpWrapper.post('/api/v1/cultures', { data: payload });
  }

  update(payload): Observable<ICultureResponse> {
    return this.httpWrapper.patch('/api/v1/cultures', { data: payload });
  }

  delete(id: number) {
    return this.httpWrapper.delete(`/api/v1/parcels/${id}`);
  }
}
