import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.sass']
})
export class RegistrationComponent {
  username!: string;
  password!: string;
  confirmPassword!: string;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    const payload = {
      email: form.value.username,
      password: form.value.password,
      confirmPassword: form.value.confirmPassword
    };
    this.authService.signIn(payload).subscribe();
  }
}
