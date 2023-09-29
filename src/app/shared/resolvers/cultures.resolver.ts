import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CultureService, ICulturesResponse } from '../services/culture.service';

@Injectable({ providedIn: 'root' })
export class CulturesResolver implements Resolve<ICulturesResponse> {
  constructor(private cultureService: CultureService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICulturesResponse> {
    return this.cultureService.getAll();
  }
}
