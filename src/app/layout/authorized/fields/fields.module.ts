import { NgModule } from '@angular/core';
import { FieldsContainerComponent } from './fields-container/fields-container.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FieldsRoutingModule } from './fields.routes';
import { MatTableModule } from '@angular/material/table';
import { ParcelsComponent } from './parcels/parcels.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MaterialModule } from '../../../shared/material.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { EditParcelComponent } from './edit-parcel/edit-parcel.component';
import { ParcelFormComponent } from './parcel-form/parcel-form.component';
import { AddParcelsComponent } from './add-parcels/add-parcels.component';

@NgModule({
  declarations: [FieldsContainerComponent, ParcelsComponent, EditParcelComponent, ParcelFormComponent, AddParcelsComponent],
  imports: [
    ReactiveFormsModule,
    SharedModule,
    NgbModule,
    CommonModule,
    RouterOutlet,
    FieldsRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MaterialModule,
    LeafletModule
  ]
})
export class FieldsModule {}
