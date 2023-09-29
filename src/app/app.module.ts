import { NgModule, Provider } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from './core.module';
import { HttpClientModule } from '@angular/common/http';
import { DefaultRouteComponent } from './components/default-route/default-route.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { addYears } from 'date-fns';
import { CookieModule } from 'ngx-cookie';
import { SharedModule } from './shared/shared.module';
import { PROXY_ENV_PROVIDERS } from './shared/helpers/proxy-envs/proxy-env-config';
import { StoreModule } from '@ngrx/store';
import { appReducers } from './store/app.reducers';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/user/user.effects';
import { ParcelsEffects } from './store/parcels/parcels.effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { CulturesEffects } from './store/cultures/cultures.effects';
import { PolygonsEffects } from './store/polygons/polygons.effects';

@NgModule({
  declarations: [AppComponent, DefaultRouteComponent],
  imports: [
    BrowserModule,
    MatSortModule,
    MatTableModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    HttpClientModule,
    SharedModule.forRoot(),
    CookieModule.forRoot({
      expires: addYears(new Date(), 1),
      sameSite: 'lax'
    }),
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([UserEffects, ParcelsEffects, CulturesEffects, PolygonsEffects])
  ],
  providers: [PROXY_ENV_PROVIDERS] as Provider[],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
