import { AfterContentInit, Component } from '@angular/core';
import { IAppState } from '../../../../store/app.state';
import { Store } from '@ngrx/store';
import { PolygonsRequested } from '../../../../store/polygons/polygons.actions';

@Component({
  selector: 'app-fields-container',
  templateUrl: './fields-container.component.html',
  styleUrls: ['./fields-container.component.sass']
})
export class FieldsContainerComponent implements AfterContentInit {
  constructor(private store: Store<IAppState>) {}

  ngAfterContentInit() {
    this.store.dispatch(PolygonsRequested());
  }
}
