import { ActionReducerMap } from '@ngrx/store';
import { IAppState } from './app.state';
import { userReducer } from './user/user.reducers';
import { parcelsReducer } from './parcels/parcels.reducers';
import { culturesReducer } from './cultures/cultures.reducers';
import { polygonsReducer } from './polygons/polygons.reducers';

export const appReducers: ActionReducerMap<IAppState> = {
  user: userReducer,
  parcels: parcelsReducer,
  cultures: culturesReducer,
  polygons: polygonsReducer,
};
