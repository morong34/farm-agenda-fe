import { DashboardContainerComponent } from './dashboard/dashboard-container/dashboard-container.component';
import { Routes } from '@angular/router';
import { AuthorizedComponent } from './authorized.component';
import { FieldsContainerComponent } from './fields/fields-container/fields-container.component';
import { CulturesComponent } from './cultures/cultures/cultures.component';
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
            loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule)
          }
        ]
      },
      {
        path: '',
        component: FieldsContainerComponent,
        children: [
          {
            path: 'fields',
            loadChildren: () => import('./fields/fields.module').then((m) => m.FieldsModule)
          }
        ]
      },
      {
        path: '',
        component: CulturesContainerComponent,
        children: [
          {
            path: 'cultures',
            loadChildren: () => import('./cultures/cultures.module').then((m) => m.CulturesModule)
          }
        ]
      }
    ]
  }
];
