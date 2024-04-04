import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { HttpWrapperService } from './http-wrapper.service';
import { IUser, UserService } from './user.service';

export interface ILoginParams {
  email: string;
  password: string;
}

export interface ISignInParams {
  email: string;
  password: string;
  confirmPassword: string;
}

@Injectable()
export class AuthService {
  constructor(
    private httpWrapper: HttpWrapperService,
    private router: Router
  ) {}

  setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  getToken(): string {
    return localStorage.getItem('auth_token') as string;
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  logOut() {
    this.router.navigate(['/auth/login']);
    localStorage.removeItem('auth_token');
  }

  signIn(params: ISignInParams): Observable<any> {
    return this.httpWrapper.post('/api/v1/auth/register', {
      data: {
        type: 'user',
        attributes: params,
      },
    });
  }

  login(params: ILoginParams): Observable<any> {
    return this.httpWrapper.post('/api/v1/auth/sign_in', { user: params }).pipe(
      catchError(response => {
        if (response.status === 451) {
          alert(response);
        }
        return throwError(response);
      })
    );
  }
}
