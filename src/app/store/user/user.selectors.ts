import { IAppState } from '../app.state';
import { createSelector } from '@ngrx/store';
import { IUserState } from './user.state';
import { IUser } from '../../shared/services/user.service';

const userState = (state: IAppState) => state.user;

export const selectUser = createSelector(
  userState,
  (state: IUserState) => state?.user
);

export const userEmail = createSelector(
  selectUser,
  (user: IUser) => user?.email
);
export const userName = createSelector(
  selectUser,
  (user: IUser) => user?.username
);
