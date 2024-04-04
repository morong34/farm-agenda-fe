/* eslint-disable prettier/prettier */
import * as L from 'leaflet';

export const displayedColumns: string[] = ['select', 'position', 'points'];

const wheatIcon = L.icon({
  iconSize: [40, 60],
  iconAnchor: [15, 55],
  iconUrl: '../../../../assets/icons/wheatIcon.png',
});

const maizeIcon = L.icon({
  iconSize: [40, 60],
  iconAnchor: [15, 55],
  iconUrl: '../../../../assets/icons/maizeIcon.png',
});

const empty = L.icon({
  iconSize: [40, 60],
  iconAnchor: [15, 55],
  iconUrl: '../../../../assets/icons/undefined.png',
});

export const iconsMap = {
  'maize': maizeIcon,
  'wheat': wheatIcon,
  null: empty,
  undefined: empty
};

export const optionsMap = {
  layers: [
    L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
      maxZoom: 18,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    }),
  ],
  zoom: 15,
  center: L.latLng(46.2369, 20.9085),
};

export const drawOptionsDisabled = {
  position: 'topleft',
  draw: {
    polyline: false,
    rectangle: false,
    circle: false,
    marker: false,
    circlemarker: false,
    polygon: false,
  },
};

export const drawOptionsEnabled = (initialDrawn) => {
  return {
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
          message: 'Nu-i bine',
        },
        shapeOptions: {},
      },
    },
    edit: {
      featureGroup: initialDrawn,
      polygon: {
        allowIntersection: false,
      },
    },
  }
};
