import * as L from 'leaflet';

export const displayedColumns: string[] = ['select', 'position', 'points'];

// MyCustomMarker = L.Icon.extend({
//   options: {
//     shadowUrl: null,
//     iconAnchor: new L.Point(12, 12),
//     iconSize: new L.Point(24, 24),
//     iconUrl: 'link/to/image.png'
//   }
// });

// drawOptions = {
//   position: 'topright',
//   draw: {
//     polyline: {
//       shapeOptions: {
//         color: '#f357a1',
//         weight: 10
//       }
//     },
//     polygon: {
//       allowIntersection: false, // Restricts shapes to simple polygons
//       drawError: {
//         color: '#e1e100', // Color the shape will turn when intersects
//         message: "<strong>Oh snap!<strong> you can't draw that!" // Message that will show when intersect
//       },
//       shapeOptions: {
//         color: '#bada55'
//       }
//     },
//     circle: false, // Turns off this drawing tool
//     rectangle: {
//       shapeOptions: {
//         clickable: false
//       }
//     },
//     marker: {
//       icon: this.MyCustomMarker
//     }
//   },
//   edit: {
//     featureGroup: this.drawnItems, //REQUIRED!!
//     remove: false
//   }
// };

// drawOptions = {
//   position: 'bottomright',
//   draw: {
//     polyline: false,
//     rectangle: false,
//     circle: false,
//     marker: false,
//     circlemarker: false
//   },
//   edit: {
//     featureGroup: this.drawnItems
//   }
// };

export const greenIcon = L.icon({
  iconUrl: 'https://png.pngtree.com/png-clipart/20210311/original/pngtree-wheat-icon-design-template-illustration-png-image_5977233.jpg',

  iconSize: [38, 95], // size of the icon
  shadowSize: [50, 64], // size of the shadow
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

export const optionsMap = {
  layers: [
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
    })
  ],
  zoom: 7,
  center: L.latLng(46.943, 24.115)
};

export const drawOptionsDisabled = {
  position: 'topleft',
  draw: {
    polyline: false,
    rectangle: false,
    circle: false,
    marker: false,
    circlemarker: false,
    polygon: false
  }
};

export const LeafIcon = L.Icon.extend({
  options: {
    shadowUrl: 'leaf-shadow.png',
    iconSize: [38, 95],
    shadowSize: [50, 64],
    iconAnchor: [22, 94],
    shadowAnchor: [4, 62],
    popupAnchor: [-3, -76]
  }
});

export enum MapIcons {
  // @ts-ignore
  wheatIcon = new LeafIcon({ iconUrl: 'src/assets/wheat.png' }),
  // @ts-ignore
  maizeIcon = new LeafIcon({ iconUrl: 'src/assets/maize.png' }),
  // @ts-ignore
  rapeIcon = new LeafIcon({ iconUrl: 'src/assets/rape.png' })
}
