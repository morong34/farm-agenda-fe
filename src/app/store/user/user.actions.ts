import { createAction, props } from '@ngrx/store';
import { IUser } from '../../shared/services/user.service';

export enum UserActions {
  UserRequested = '[User] User Requested',
  UserLoaded = '[User] User Loaded',
  UserError = '[User] User Error',
  UserLoggedOut = '[User] User Logged Out',
}

export const UserRequested = createAction(UserActions.UserRequested);

export const UserLoaded = createAction(
  UserActions.UserLoaded,
  props<{ user: IUser }>()
);

export const UserError = createAction(
  UserActions.UserError,
  props<{ err: string }>()
);

export const UserLoggedOut = createAction(UserActions.UserLoggedOut);
