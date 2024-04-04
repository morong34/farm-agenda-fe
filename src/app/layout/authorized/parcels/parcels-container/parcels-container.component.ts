import { AfterContentInit, Component } from '@angular/core';
import { IAppState } from '../../../../store/app.state';
import { Store } from '@ngrx/store';
import { PolygonsRequested } from '../../../../store/polygons/polygons.actions';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-parcels-container',
  templateUrl: './parcels-container.component.html',
  styleUrl: './parcels-container.component.sass',
  standalone: true,
  imports: [RouterOutlet],
})
export class ParcelsContainerComponent implements AfterContentInit {
  constructor(private store: Store<IAppState>) {}

  ngAfterContentInit() {
    this.store.dispatch(PolygonsRequested());
  }
}
