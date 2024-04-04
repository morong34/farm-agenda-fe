import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
import { enableProdMode, Provider, importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { PolygonsEffects } from './app/store/polygons/polygons.effects';
import { CulturesEffects } from './app/store/cultures/cultures.effects';
import { ParcelsEffects } from './app/store/parcels/parcels.effects';
import { UserEffects } from './app/store/user/user.effects';
import { EffectsModule } from '@ngrx/effects';
import { appReducers } from './app/store/app.reducers';
import { StoreModule } from '@ngrx/store';
import { addYears } from 'date-fns';
import { CookieModule } from 'ngx-cookie';
import { SharedModule } from './app/shared/shared.module';
import {
  withInterceptorsFromDi,
  provideHttpClient,
} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routes } from './app/app.routes';
import { provideRouter, withViewTransitions } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { PROXY_ENV_PROVIDERS } from './app/shared/helpers/proxy-envs/proxy-env-config';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      MatSortModule,
      MatTableModule,
      FormsModule,
      ReactiveFormsModule,
      SharedModule.forRoot(),
      CookieModule.forRoot({
        expires: addYears(new Date(), 1),
        sameSite: 'lax',
      }),
      StoreModule.forRoot(appReducers),
      EffectsModule.forRoot([
        UserEffects,
        ParcelsEffects,
        CulturesEffects,
        PolygonsEffects,
      ])
    ),
    ...([PROXY_ENV_PROVIDERS] as Provider[]),
    provideAnimationsAsync(),
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(withInterceptorsFromDi()),
  ],
}).catch(err => console.error(err));
