import { NgModule } from '@angular/core';
import { CulturesComponent } from './cultures/cultures.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AddCulturesComponent } from './add-cultures/add-cultures.component';
import { EditCulturesComponent } from './edit-cultures/edit-cultures.component';
import { CultureRoutingModule } from './cultures.routes';
import { CulturesContainerComponent } from './cultures-container/cultures-container.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    SharedModule,
    CommonModule,
    RouterOutlet,
    CultureRoutingModule,
    FormsModule,
    LeafletModule,
    CulturesComponent,
    CulturesContainerComponent,
    AddCulturesComponent,
    EditCulturesComponent,
    CulturesContainerComponent,
  ],
})
export class CulturesModule {}
