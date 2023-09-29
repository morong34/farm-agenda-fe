import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CultureService, ICultureResponse } from '../services/culture.service';

@Injectable({ providedIn: 'root' })
export class CultureResolver implements Resolve<ICultureResponse> {
  constructor(private cultureService: CultureService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICultureResponse> {
    return this.cultureService.getById(route.params.id);
  }
}
