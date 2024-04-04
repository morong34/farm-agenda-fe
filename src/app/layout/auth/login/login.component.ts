import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { NgForm, FormsModule } from '@angular/forms';
import { UserService } from '../../../shared/services/user.service';
import { IAppState } from '../../../store/app.state';
import { Store } from '@ngrx/store';
import { UserLoggedOut } from '../../../store/user/user.actions';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass',
  standalone: true,
  imports: [FormsModule, NgOptimizedImage],
})
export class LoginComponent implements OnInit {
  requestInProgress = false;
  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private store: Store<IAppState>
  ) {}

  ngOnInit() {
    this.initComponent();
  }
  onSubmit(form: NgForm) {
    if (this.requestInProgress) {
      return;
    }

    if (form.invalid) {
      form.controls['email'].markAsTouched({ onlySelf: true });
      form.controls['password'].markAsTouched({ onlySelf: true });
      return;
    }

    this.requestInProgress = true;
    const payload = { email: form.value.email, password: form.value.password };
    this.authService
      .login(payload)
      .subscribe(this.onLoginSuccess.bind(this), this.onLoginError.bind(this));
  }

  private initComponent() {
    this.store.dispatch(UserLoggedOut());
  }

  private onLoginSuccess() {
    this.userService.clearCache();
    this.requestInProgress = false;
    return this.router.navigate(['parcels/']);
  }

  private onLoginError(response: any) {
    alert(response.data);
    this.requestInProgress = false;
  }

  onSwitchMode() {
    this.router.navigate(['/auth/registration']);
  }
}
