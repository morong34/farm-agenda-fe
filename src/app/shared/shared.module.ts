import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { WindowService } from './services/window.service';
import { AuthGuard } from './quards/auth-guard.service';
import { MapComponent } from './components/map/map.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';
import { InformationComponent } from './common/information-form/information.component';
import { ActionBarComponent } from './components/action-bar/action-bar.component';
import { ActionBarActionComponent } from './components/action-bar/action-bar-action/action-bar-action.component';
import { ParcelsInformationModalComponent } from './common/parcels-information-modal/parcels-information-modal.component';

@NgModule({
  imports: [
    CommonModule,
    RouterLinkActive,
    RouterLink,
    FormsModule,
    CdkTableModule,
    RouterOutlet,
    TooltipModule,
    LeafletModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    LeafletDrawModule,
    MapComponent,
    SidebarComponent,
    ActionBarComponent,
    InformationComponent,
    ActionBarActionComponent,
    ParcelsInformationModalComponent,
  ],
  exports: [
    MapComponent,
    SidebarComponent,
    InformationComponent,
    ActionBarComponent,
    ActionBarActionComponent,
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [AuthService, WindowService, AuthGuard],
    };
  }
}
