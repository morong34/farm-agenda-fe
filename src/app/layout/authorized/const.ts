import { FormGroup } from '@angular/forms';
import { FormMode } from 'app/shared/helpers/forms/baseFormComponent';
import { LatLng } from 'leaflet';

export interface config {
  form?: { mode?: FormMode; parentFormGroup?: FormGroup };
  tab?: string;
  map?: {
    style?: any;
    polygonClickable?: boolean;
    showMarkerPolygon?: boolean;
    markerPolygonClickable?: boolean;
    markerPolygonToEditClickable?: boolean;
    showMarkerPolygonToEdit?: boolean;
    center?: LatLng
    zoom?: number;
    enableSearch?: boolean
  };
}
