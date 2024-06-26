import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParcelsComponent } from './parcels/parcels.component';
import { AddParcelsComponent } from './add-parcels/add-parcels.component';
import { EditParcelComponent } from './edit-parcel/edit-parcel.component';
import { ParcelResolver } from '../../../shared/resolvers/parcel.resolver';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'add', component: AddParcelsComponent },
      {
        path: ':id/edit',
        component: EditParcelComponent,
        resolve: { parcel: ParcelResolver },
      },
      { path: '**', component: ParcelsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParcelsRoutingModule {}
