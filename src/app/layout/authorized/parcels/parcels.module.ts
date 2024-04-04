import { NgModule } from '@angular/core';
import { ParcelsContainerComponent } from './parcels-container/parcels-container.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ParcelsComponent } from './parcels/parcels.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { EditParcelComponent } from './edit-parcel/edit-parcel.component';
import { ParcelFormComponent } from './parcel-form/parcel-form.component';
import { AddParcelsComponent } from './add-parcels/add-parcels.component';
import { ParcelsRoutingModule } from './parcels.routes';

@NgModule({
  imports: [
    ReactiveFormsModule,
    SharedModule,
    CommonModule,
    RouterOutlet,
    ParcelsRoutingModule,
    FormsModule,
    LeafletModule,
    ParcelsContainerComponent,
    ParcelsComponent,
    EditParcelComponent,
    ParcelFormComponent,
    AddParcelsComponent,
  ],
})
export class ParcelsModule {}
