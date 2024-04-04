import { initialUserState, IUserState } from './user.state';
import { UserLoaded, UserLoggedOut } from './user.actions';
import { IUser } from '../../shared/services/user.service';
import { createReducer, on } from '@ngrx/store';

const setUser = (state: IUserState, { user }: { user: IUser }) => ({
  ...state,
  user,
});
const removeUser = (state: IUserState) => ({ ...state, user: null });

const _userReducer = createReducer<IUserState>(
  initialUserState,
  on(UserLoaded, setUser),
  on(UserLoggedOut, removeUser)
);

export function userReducer(state: IUserState, action): IUserState {
  return _userReducer(state, action);
}
