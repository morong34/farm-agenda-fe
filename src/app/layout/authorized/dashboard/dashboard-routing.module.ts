import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardContainerComponent } from './dashboard-container/dashboard-container.component';
import { DashboardStartComponent } from './dashboard-start/dashboard-start.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardContainerComponent,
    // canActivate: [ActivateGuard],
    children: [
      { path: 'start', component: DashboardStartComponent }
      // { path: 'new', component: RecipesEditComponent },
      // { path: ':id', component: RecipeDetailsComponent, resolve: { recipe: RecipesResolverService } },
      // { path: ':id/edit', component: RecipesEditComponent, resolve: { recipe: RecipesResolverService } }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
