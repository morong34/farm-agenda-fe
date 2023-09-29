import { IUser } from '../../shared/services/user.service';

export const initialUserState: IUserState = {
  user: null
};

export interface IUserState {
  user: IUser;
}
