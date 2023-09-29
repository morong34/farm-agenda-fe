import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { routes } from './auth.routes';

@NgModule({
  declarations: [AuthComponent, LoginComponent, RegistrationComponent],
  imports: [CommonModule, FormsModule, SharedModule, RouterModule.forChild(routes), NgOptimizedImage]
})
export class AuthModule {}
