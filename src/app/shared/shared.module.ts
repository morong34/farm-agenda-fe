import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { PlaceholderDirective } from './directive/placeholder.directive';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { WindowService } from './services/window.service';
import { AuthGuard } from './quards/auth-guard.service';
import { MapComponent } from './components/map/map.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';
import { MaterialModule } from './material.module';
import { NgbModule } from './ngb.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatCustomTableModule } from './components/table/table.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';
import { CulturesInformationComponent } from './common/cultures-information/cultures-information.component';
import { InformationComponent } from './common/information-form/information.component';
import { ActionBarComponent } from './components/action-bar/action-bar.component';
import { ActionBarActionComponent } from './components/action-bar/action-bar-action/action-bar-action.component';

@NgModule({
  declarations: [
    PlaceholderDirective,
    MapComponent,
    SidebarComponent,
    CulturesInformationComponent,
    ActionBarComponent,
    InformationComponent,
    ActionBarActionComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgbModule,
    RouterLinkActive,
    RouterLink,
    FormsModule,
    CdkTableModule,
    RouterOutlet,
    TooltipModule,
    LeafletModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    LeafletDrawModule
  ],
  exports: [
    PlaceholderDirective,
    MatCustomTableModule,
    MapComponent,
    SidebarComponent,
    CulturesInformationComponent,
    InformationComponent,
    ActionBarComponent,
    ActionBarActionComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [AuthService, WindowService, AuthGuard]
    };
  }
}
