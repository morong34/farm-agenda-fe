import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';
import { EnvService } from './env.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpWrapperService {
  baseUrl = '';

  constructor(
    private http: HttpClient,
    private envService: EnvService,
    private router: Router
  ) {
    this.loadEnvs();
  }

  loadEnvs() {
    this.setUrl(environment.API_URL);
  }

  generateOptions(options: any = {}) {
    if (!options.headers) {
      options.headers = new HttpHeaders();
    }

    if (!options.observe) {
      options.observe = 'response';
    }
    this.setAuthorizationheaders(options);
    return options;
  }

  private setAuthorizationheaders(options: any) {
    const token: string | null = localStorage.getItem('auth_token');
    if (token) {
      options.headers = options.headers.set('Authorization', token);
      options.headers = options.headers.set(
        'Content-Type',
        'application/vnd.api+json'
      );
    }
  }

  private setUrl(url: string) {
    this.baseUrl = url;
  }

  generateUrl(url: string) {
    if (url.match(/^(http|https):\/\//)) {
      return url;
    } else {
      return `${this.baseUrl}${url}`;
    }
  }

  private getAuthorizationHeader(response: HttpResponse<any>) {
    if (!response.headers) {
      return;
    }

    const token: string | null = response.headers.get('Authorization');
    if (token) {
      localStorage.setItem('auth_token', token);
    }
  }

  private catchUnauthorized(response: HttpErrorResponse | HttpResponse<any>) {
    if (response.status === 401) {
      localStorage.removeItem('auth_token');
      const route = ['/auth/login'];
      this.router.navigate(route, {});
    } else if (response.status === 503 || response.status === 0) {
      // TODO: a context where the server is down
      // this.router.navigate(['/server-down']);
    }
  }

  responseHandler(response: HttpResponse<any>): HttpResponse<any> | Blob | any {
    this.getAuthorizationHeader(response);
    this.catchUnauthorized(response);

    return response.body;
  }

  errorResponseHandler(response: HttpErrorResponse) {
    this.catchUnauthorized(response);
    return throwError({ data: response.error, status: response.status });
  }

  get<T>(url: string, params?: any): Observable<T> {
    return this.http
      .get(this.generateUrl(url), this.generateOptions(params))
      .pipe(
        map(this.responseHandler.bind(this)),
        catchError(this.errorResponseHandler.bind(this))
      );
  }

  post<T>(url: string, body: any, options?: any): Observable<T> {
    return this.http
      .post(this.generateUrl(url), body, this.generateOptions(options))
      .pipe(
        map(this.responseHandler.bind(this)),
        catchError(this.errorResponseHandler.bind(this))
      );
  }

  put<T>(url: string, body: any, options?: any): Observable<T> {
    return this.http
      .put(this.generateUrl(url), body, this.generateOptions(options))
      .pipe(
        map(this.responseHandler.bind(this)),
        catchError(this.errorResponseHandler.bind(this))
      );
  }

  patch<T>(url: string, body: any, options?: any): Observable<T> {
    return this.http
      .patch(this.generateUrl(url), body, this.generateOptions(options))
      .pipe(
        map(this.responseHandler.bind(this)),
        catchError(this.errorResponseHandler.bind(this))
      );
  }

  delete<T>(url: string, options?: any): Observable<T> {
    return this.http
      .delete(this.generateUrl(url), this.generateOptions(options))
      .pipe(
        map(this.responseHandler.bind(this)),
        catchError(this.errorResponseHandler.bind(this))
      );
  }
}
