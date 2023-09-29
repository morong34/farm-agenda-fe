import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardRoutingModule } from './dashboard/dashboard-routing.module';
import { AuthorizedComponent } from './authorized.component';
import { RouterModule } from '@angular/router';
import { routes } from './authorized.routes';
import { MaterialModule } from '../../shared/material.module';

@NgModule({
  declarations: [AuthorizedComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    SharedModule,
    NgbModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  exports: []
})
export class AuthorizedModule {}
