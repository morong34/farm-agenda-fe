import { Routes } from '@angular/router';
import { DefaultRouteComponent } from './components/default-route/default-route.component';
import { AuthGuard } from './shared/quards/auth-guard.service';

export const routes: Routes = [
  { path: '', component: DefaultRouteComponent },
  {
    path: 'auth',
    loadChildren: () =>
      import('./layout/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./layout/authorized/authorized.module').then(
        m => m.AuthorizedModule
      ),
  },
  { path: '**', component: DefaultRouteComponent },
];
