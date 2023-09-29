import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import { FeatureGroup, featureGroup } from 'leaflet';
import 'leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.js';
import { IUser } from '../../services/user.service';
import { drawOptionsDisabled, optionsMap } from './const';
import { isEmpty } from 'lodash';
import { FormMode } from '../../helpers/forms/baseFormComponent';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent implements OnInit, OnChanges {
  @Input() polygons: any = [];
  @Input() polygonsToEdit: any = [];
  @Input() mode: FormMode = FormMode.View;
  @Input() parentFormGroup: FormGroup;
  @Input() style: any;
  @Input() polygonClickable: boolean;
  @Input() showMarker: boolean;
  @Output() polygonClickAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() markerClickAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() drawCreated: EventEmitter<any> = new EventEmitter<any>();
  @Output() drawEdited: EventEmitter<any> = new EventEmitter<any>();
  @Output() drawDeleted: EventEmitter<any> = new EventEmitter<any>();
  user: IUser;
  mapValid: boolean = true;

  map: L.Map;
  initialDrawn: FeatureGroup = featureGroup();
  drawnItems: FeatureGroup = featureGroup();

  options = optionsMap;

  drawOptionsEnabled = {
    position: 'topleft',
    draw: {
      polyline: false,
      rectangle: false,
      circle: false,
      marker: false,
      circlemarker: false,
      polygon: {
        allowIntersection: false,
        drawError: {
          color: '#e1e100',
          message: 'Nu-i bine'
        },
        shapeOptions: {}
      }
    },
    edit: {
      featureGroup: this.initialDrawn,
      polygon: {
        allowIntersection: false
      }
    }
  };

  constructor() {}
  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
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

    this.map.eachLayer((layer: L.Polygon) => {
      if (layer instanceof L.Polygon && !(layer instanceof L.Rectangle) && layer.getBounds().intersects(polygon.layer.getBounds())) {
        layer.setStyle({ color: 'red' });
        polygon.layer.setStyle({ color: 'red' });
        this.mapValid = true;
      }
    });

    this.drawCreated.emit(polygonCoordinates.coordinates);
    this.drawnItems.addLayer((polygon as L.DrawEvents.Created).layer);
  }

  onDrawEdited() {
    let result = [];
    this.initialDrawn.eachLayer((layer: L.Layer) => {
      if (layer instanceof L.Polygon && !(layer instanceof L.Rectangle)) {
        result.push(layer.getLatLngs());
      }
    });

    this.drawEdited.emit(result);
  }

  onDrawDeleted() {
    let result = [];
    this.initialDrawn.eachLayer((layer) => {
      if (layer instanceof L.Polygon && !(layer instanceof L.Rectangle)) {
        result.push(layer.getLatLngs());
      }
    });

    this.drawDeleted.emit(result);
  }
  setPolygons(): void {
    if (!isEmpty(this.polygons)) {
      this.mapingPolygons(this.polygons, this.drawnItems, false, this.mode === FormMode.View, 'black');
    }
  }

  setWorkingPolygons(): void {
    if (!isEmpty(this.polygonsToEdit)) {
      this.mapingPolygons(this.polygonsToEdit, this.initialDrawn, this.showMarker, this.polygonClickable, 'red');
    }
  }

  mapingPolygons(polygons: [][], formGroup: FeatureGroup, showMarker: boolean, polygonClickable: boolean, color: string) {
    polygons.forEach((polygon: any) => {
      const my_coors = polygon.coordinates.coordinates;
      const latLngs_coordinates = my_coors.map((coord: any) => L.latLng(coord[1], coord[0]));
      const poly = L.polygon(latLngs_coordinates, { color: color, interactive: true });
      if (showMarker) {
        let bounds = poly.getBounds();
        let center = bounds.getCenter();
        let marker = L.marker(center).addTo(this.map);
        marker.on('click', (event) => this.markerClick(event, polygon));
      }
      if (polygonClickable) {
        poly.on('click', (event) => this.polygonClick(event, polygon));
      }
      formGroup?.addLayer(poly);
    });
  }
  markerClick(event: any, polygon: any) {
    this.markerClickAction.emit({ event, polygon });
  }

  polygonClick(event: any, polygon: any) {
    this.polygonClickAction.emit({ event, polygon });
  }
  get mapStyle() {
    return this.mode === FormMode.Create || this.mode === FormMode.Edit ? { 'height.vh': 70, 'width.px': 950 } : { 'height.vh': 90 };
  }

  onMapReady($event: L.Map): void {
    this.map = $event;
    setTimeout(() => {
      this.map.invalidateSize();
      this.map.addLayer(this.drawnItems);
    }, 0);
  }
  get drawOptions() {
    return this.mode === FormMode.Edit || this.mode === FormMode.Create ? this.drawOptionsEnabled : drawOptionsDisabled;
  }

  // TODO pentru partea cu overlay polygons!!

  protected readonly FormMode = FormMode;
}
