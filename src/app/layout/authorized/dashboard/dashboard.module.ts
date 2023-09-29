import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardContainerComponent } from './dashboard-container/dashboard-container.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardStartComponent } from './dashboard-start/dashboard-start.component';

@NgModule({
  declarations: [DashboardContainerComponent, DashboardStartComponent],
  imports: [ReactiveFormsModule, SharedModule, NgbModule, CommonModule, DashboardRoutingModule]
})
export class DashboardModule {}
