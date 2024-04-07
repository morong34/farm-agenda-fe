import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import * as L from 'leaflet';
import { FeatureGroup, featureGroup } from 'leaflet';
import 'leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.js';
import {
  drawOptionsDisabled,
  drawOptionsEnabled,
  iconsMap,
  optionsMap,
} from './const';
import { includes, isEmpty } from 'lodash';
import { FormMode } from '../../helpers/forms/baseFormComponent';
import { NgStyle, NgIf } from '@angular/common';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { config } from 'app/layout/authorized/const';
import { polygonCoordinates } from 'app/store/polygons/polygons.selectors';
import Geocoder from 'leaflet-control-geocoder';
import { MarkGeocodeEvent } from 'leaflet-control-geocoder/dist/control';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass'],
  standalone: true,
  imports: [LeafletModule, LeafletDrawModule, NgStyle, NgIf]
})
export class MapComponent implements OnInit, OnChanges {
  @Input() polygons: any = [];
  @Input() polygonsToEdit: any = [];
  @Input() config: config = {};

  @Output() polygonClickAction: EventEmitter<{
    polygon?: polygonCoordinates;
  }> = new EventEmitter<{}>();
  @Output() markerClickAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() drawCreated: EventEmitter<any> = new EventEmitter<any>();
  @Output() drawEdited: EventEmitter<any> = new EventEmitter<any>();
  @Output() drawDeleted: EventEmitter<any> = new EventEmitter<any>();

  map: L.Map;
  markers: L.Marker[] = [];
  lLolygons: L.Polygon[] = [];
  private _zoom: number;
  initialDrawn: FeatureGroup = featureGroup();
  drawnItems: FeatureGroup = featureGroup();
  dezactivateEditOption = ['add-culture'];
  dezactivateMarkerIcon = ['cultures', 'add-culture', 'edit-culture'];
  searchResult: L.Marker;

  options = optionsMap;

  constructor() {}

  ngOnInit(): void {
    if (this.config?.map?.center) this.options.center = this.config?.map?.center;
    if (this.config?.form?.mode === FormMode.Edit) this.options.zoom = 17;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.markers = [];
    if (changes.polygons?.currentValue) {
      this.setPolygons();
    }

    if (changes.polygonsToEdit?.currentValue) {
      this.setWorkingPolygons();
    }
  }

  onDrawCreated(polygon: any) {
    const polygonCoordinates = polygon.layer.toGeoJSON().geometry;
    polygonCoordinates.type = polygonCoordinates.type.toLocaleLowerCase();

    this.drawCreated.emit(polygonCoordinates.coordinates);
    this.config.form.mode === FormMode.Edit
      ? this.initialDrawn.addLayer((polygon as L.DrawEvents.Created).layer)
      : this.drawnItems.addLayer((polygon as L.DrawEvents.Created).layer);
  }

  onDrawEdited(polygon: any) {
    let result = [];

    polygon.layers.eachLayer((layer: any) => {
      let l = layer.toGeoJSON().geometry;
      l.type = l.type.toLocaleLowerCase();
      l.id = layer.polygonId;
      result.push(l);
    });
    this.drawEdited.emit(result[0]);
  }

  onDrawDeleted(polygon: any) {
    let result = [];

    polygon.layers.eachLayer((layer: any) => {
      result.push(layer);
    });
    this.drawDeleted.emit(result[0]);
  }
  setPolygons(): void {
    if (!isEmpty(this.polygons) && this.map) {
      this.drawnItems.clearLayers();
      this.mappingPolygons(
        this.polygons,
        this.drawnItems,
        this.config.map.showMarkerPolygon,
        this.config.map.markerPolygonClickable,
        this.config.form.mode === FormMode.View,
        'black'
      );
    } else {
      this.drawnItems.clearLayers();
    }
  }

  setWorkingPolygons(): void {
    if (!isEmpty(this.polygonsToEdit) && this.map) {
      this.initialDrawn.clearLayers();
      this.mappingPolygons(
        this.polygonsToEdit,
        this.initialDrawn,
        this.config.map.showMarkerPolygonToEdit,
        this.config.map.markerPolygonToEditClickable,
        this.config.map.polygonClickable,
        'red'
      );
    }
  }

  mappingPolygons(
    polygons: [][],
    formGroup: FeatureGroup,
    showMarker: boolean,
    markerClickable: boolean,
    polygonClickable: boolean,
    color: string,
    polygonSelectedColor?: string
  ) {
    polygons.forEach((polygon: any) => {
      const my_coors = polygon?.coordinates?.coordinates;
      const latLngs_coordinates = my_coors?.map((coord: any) =>
        L.latLng(coord[1], coord[0])
      );
      const poly = L.polygon(latLngs_coordinates, {
        color: polygon.isSelected ? polygonSelectedColor : color,
        interactive: true,
      });

      Object.assign(poly, { polygonId: polygon.id, culture: polygon.culture });
      if (showMarker) {
        let bounds = poly.getBounds();
        let center = bounds.getCenter();
        let marker = L.marker(center, {
          icon: iconsMap[polygon.culture],
        });
        if (markerClickable) {
          marker.on('click', () => this.markerClick(marker));
        }
        this.map.on('zoomend', () => {
          const currentZoom = this.map.getZoom();
          if (currentZoom > 14) {
            marker.setOpacity(1); 
          } else {
            marker.setOpacity(0); 
          }
        });
        marker.addTo(this.map);
        this.markers.push(marker);
      }
      if (polygonClickable) {
        poly.on('click', e => this.polygonClick(polygon, e));
      }
      formGroup?.addLayer(poly);
      this.lLolygons.push(poly);
    });
  }

  markerClick(marker: any) {
    this.markerClickAction.emit({ marker });
  }

  polygonClick(polygon: polygonCoordinates, event: any) {
    switch (this.config.form.mode) {
      case FormMode.Create:
        let poly1 = this.polygonsToEdit.find(p => p === polygon);
        poly1.isSelected = poly1.isSelected ? false : true;
        let color1 = poly1.isSelected ? '#F7C04A' : 'red';
        event.target.setStyle({ fillColor: color1, color1 });
        break;
      case FormMode.Edit:
        let poly2 = this.polygonsToEdit.find(p => p === polygon);
        poly2.isSelected = poly2.isSelected ? false : true;
        let color2 = poly2.isSelected ? '#F7C04A' : 'black';
        event.target.setStyle({ fillColor: color2, color2 });
        break;
      case FormMode.View:
        this.polygonClickAction.emit({ polygon });
        break;
      default:
        break;
    }
  }

  get polygonsSelected() {
    // @ts-ignore
    return Object.groupBy(
      this.polygonsToEdit.filter(p => p.isSelected),
      item => item.parcelId
    );
  }

  onMapReady($event: L.Map): void {
    this.map = $event;
    setTimeout(() => {
      this.map.invalidateSize();
      this.map.addLayer(this.drawnItems);
      this.redrawMap();
      if (this.config?.map?.enableSearch) this.addSearch()
    });
  }

  protected addSearch() {
    const geocoderControl = new Geocoder({ defaultMarkGeocode: false}).on('markgeocode', (result: MarkGeocodeEvent) => {
      this.searchResult = L.marker(result.geocode.center, {
        icon: iconsMap['resultSearch'],
        draggable: true
      });
      this.searchResult.addTo(this.map);
    });
    geocoderControl.addTo(this.map);
  }

  get returnSearchResult() {
    return this.searchResult ?
      `${this.searchResult.getLatLng().lat},${this.searchResult.getLatLng().lng}` :
      navigator.geolocation.getCurrentPosition(
      ((position) => `${position.coords.latitude}, ${position.coords.longitude}`),
      ((err) => { console.error(err)})
    );
      
  }

  get drawOptions() {
    return (this.config.form.mode === FormMode.Edit ||
      this.config.form.mode === FormMode.Create) &&
      !includes(this.dezactivateEditOption, this.config.tab)
      ? drawOptionsEnabled(this.initialDrawn)
      : drawOptionsDisabled;
  }

  redrawMap() {
    this.cleanUpMap();
    if (!isEmpty(this.polygonsToEdit)) {
      this.setWorkingPolygons();
    }

    if (!isEmpty(this.polygons)) {
      this.setPolygons();
    }
  }

  pushPolygon(polygons: any) {
    this.cleanUpMap();
    this.mappingPolygons(
      polygons,
      this.drawnItems,
      this.config.map.showMarkerPolygon,
      this.config.map.markerPolygonClickable,
      this.config.form.mode === FormMode.View,
      'black'
    );
  }

  cleanUpMap(removeCurrentPolygon?: boolean) {
    this.markers.forEach((marker: L.Marker) => this.map.removeLayer(marker));
    this.lLolygons.forEach((polygon: L.Polygon) =>
      this.map.removeLayer(polygon)
    );
    this.initialDrawn.clearLayers();
    this.drawnItems.clearLayers();
    if (removeCurrentPolygon) {
      this.polygons = [];
      this.polygonsToEdit = [];
    }
  }

  get zoom() {
    return this._zoom;
  }

  setCenter(value) {
    this.options.center = new L.LatLng(value.lat, value.lng)
  }

  protected readonly FormMode = FormMode;
}
