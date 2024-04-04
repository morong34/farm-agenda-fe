import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthorizedComponent } from './authorized.component';
import { RouterModule } from '@angular/router';
import { routes } from './authorized.routes';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule,
    RouterModule.forChild(routes),
    AuthorizedComponent,
  ],
  exports: [],
})
export class AuthorizedModule {}
