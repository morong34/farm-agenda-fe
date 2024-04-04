import { DashboardContainerComponent } from './dashboard/dashboard-container/dashboard-container.component';
import { Routes } from '@angular/router';
import { AuthorizedComponent } from './authorized.component';
import { ParcelsContainerComponent } from './parcels/parcels-container/parcels-container.component';
import { CulturesContainerComponent } from './cultures/cultures-container/cultures-container.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthorizedComponent,
    children: [
      {
        path: '',
        component: DashboardContainerComponent,
        children: [
          {
            path: 'dashboard',
            loadChildren: () =>
              import('./dashboard/dashboard.module').then(
                m => m.DashboardModule
              ),
          },
        ],
      },
      {
        path: '',
        component: ParcelsContainerComponent,
        children: [
          {
            path: 'parcels',
            loadChildren: () =>
              import('./parcels/parcels.module').then(m => m.ParcelsModule),
          },
        ],
      },
      {
        path: '',
        component: CulturesContainerComponent,
        children: [
          {
            path: 'cultures',
            loadChildren: () =>
              import('./cultures/cultures.module').then(m => m.CulturesModule),
          },
        ],
      },
    ],
  },
];
