import { ActivatedRouteSnapshot, Resolve, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPolygonsResponse, PolygonsService } from '../services/polygons.service';

export const polygonsResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};

@Injectable({ providedIn: 'root' })
export class PolygonsResolver implements Resolve<IPolygonsResponse> {
  constructor(private polygonsService: PolygonsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPolygonsResponse> {
    return this.polygonsService.getAll();
  }
}
