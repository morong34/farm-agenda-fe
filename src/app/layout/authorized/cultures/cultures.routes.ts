import { RouterModule, Routes } from '@angular/router';
import { CulturesComponent } from './cultures/cultures.component';
import { NgModule } from '@angular/core';
import { CultureResolver } from '../../../shared/resolvers/culture.resolver';
import { AddCulturesComponent } from './add-cultures/add-cultures.component';
import { EditCulturesComponent } from './edit-cultures/edit-cultures.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'add',
        component: AddCulturesComponent,
      },
      {
        path: ':id/edit',
        component: EditCulturesComponent,
        resolve: { culture: CultureResolver },
      },
      { path: '**', component: CulturesComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CultureRoutingModule {}
