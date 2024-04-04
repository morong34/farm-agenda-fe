import { AfterContentInit, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../store/app.state';
import { RouterOutlet } from '@angular/router';
import { PolygonsRequested } from 'app/store/polygons/polygons.actions';
import { SidebarService } from 'app/shared/services/sidebar.service';

@Component({
  selector: 'app-cultures-container',
  templateUrl: './cultures-container.component.html',
  styleUrl: './cultures-container.component.sass',
  standalone: true,
  imports: [RouterOutlet],
})
export class CulturesContainerComponent implements AfterContentInit {
  constructor(
    private store: Store<IAppState>,
    private sideBarService: SidebarService
  ) {}

  ngAfterContentInit() {
    // this.sideBarService.title.next('Cultures');
    this.store.dispatch(PolygonsRequested());
  }
}
