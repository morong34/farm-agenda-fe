import { Injectable } from '@angular/core';
import { HttpWrapperService } from './http-wrapper.service';
import { Observable, publishReplay, refCount } from 'rxjs';

export interface IUser {
  id?: number;
  email?: string;
  created_at?: string;
  updated_at?: string;
  polygon_id?: number;
  first_name?: string;
  last_name?: string;
  address?: string;
  username?: string;
  string?: string;
  phone_number?: string;
  avatar?: string;
  is_admin?: boolean;
  is_active?: boolean;
}

export interface IUserResponse {
  data?: {
    id?: string;
    type?: 'users';
    links?: {
      self?: string;
    };
    attributes?: IUser;
  };
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _observable: Observable<IUser>;
  private _currentUser: IUser;
  constructor(private httpWrapper: HttpWrapperService) {}

  clearCache() {
    this._currentUser = null;
    this._observable = null;
  }

  currentUser(): Observable<IUser> {
    if (!this._observable) {
      this._observable = this.httpWrapper.get<IUser>(`/api/v1/current_user`).pipe(publishReplay(1), refCount());
      this._observable.subscribe((user) => {
        this._currentUser = user;
      });
    }

    return this._observable;
  }

  get currentLoggedUser(): Observable<IUser> {
    return this._observable;
  }
}
