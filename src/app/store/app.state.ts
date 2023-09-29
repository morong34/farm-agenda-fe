import { initialUserState, IUserState } from './user/user.state';
import { initialParcelsState, IParcelsState } from './parcels/parcels.state';
import { ICultureState, initialCulturesState } from './cultures/cultures.state';
import { initialPolygonsState, IPolygonsState } from './polygons/polygons.state';

export enum AppFeatures {
  USER = 'user',
  PARCELS = 'parcels',
  CULTURES = 'cultures',
  POLYGONS = 'polygons'
}
export const initialAppState = {
  [AppFeatures.USER]: initialUserState,
  [AppFeatures.PARCELS]: initialParcelsState,
  [AppFeatures.CULTURES]: initialCulturesState,
  [AppFeatures.POLYGONS]: initialPolygonsState
};

export type IAppState = Partial<{
  [AppFeatures.USER]: IUserState;
  [AppFeatures.PARCELS]: IParcelsState;
  [AppFeatures.CULTURES]: ICultureState;
  [AppFeatures.POLYGONS]: IPolygonsState;
}>;

export function getInitialState(): IAppState {
  return initialAppState;
}
