import {
  ActivatedRouteSnapshot,
  Resolve,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { IParcelsResponse, ParcelsService } from '../services/parcels.service';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class ParcelsResolver implements Resolve<IParcelsResponse> {
  constructor(private parcelService: ParcelsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IParcelsResponse> {
    return this.parcelService.getAll();
  }
}
