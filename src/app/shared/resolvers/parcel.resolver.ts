import { ActivatedRouteSnapshot, Resolve, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { IParcelResponse, ParcelsService } from '../services/parcels.service';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class ParcelResolver implements Resolve<IParcelResponse> {
  constructor(private parcelService: ParcelsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IParcelResponse> {
    return this.parcelService.getById(route.params.id);
  }
}
