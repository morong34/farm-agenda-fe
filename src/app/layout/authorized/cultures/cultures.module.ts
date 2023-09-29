import { NgModule } from '@angular/core';
import { CulturesComponent } from './cultures/cultures.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MaterialModule } from '../../../shared/material.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AddCulturesComponent } from './add-cultures/add-cultures.component';
import { EditCulturesComponent } from './edit-cultures/edit-cultures.component';
import { FormCulturesComponent } from './culture-form/form-cultures.component';
import { CultureRoutingModule } from './cultures.routes';
import { FaTypographyModule } from 'farm-agenda-design-system';
import { GridsterComponent, GridsterItemComponent } from 'angular-gridster2';
import { CulturesContainerComponent } from './cultures-container/cultures-container.component';

@NgModule({
  declarations: [
    CulturesComponent,
    CulturesContainerComponent,
    AddCulturesComponent,
    EditCulturesComponent,
    FormCulturesComponent,
    CulturesContainerComponent
  ],
  imports: [
    ReactiveFormsModule,
    SharedModule,
    NgbModule,
    CommonModule,
    RouterOutlet,
    CultureRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MaterialModule,
    LeafletModule,
    FaTypographyModule,
    GridsterComponent,
    GridsterItemComponent
  ]
})
export class CulturesModule {}
