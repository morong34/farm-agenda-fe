import { AfterContentInit, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../store/app.state';
import { CulturesRequested } from '../../../../store/cultures/cultures.actions';

@Component({
  selector: 'app-cultures-container',
  templateUrl: './cultures-container.component.html',
  styleUrls: ['./cultures-container.component.sass']
})
export class CulturesContainerComponent implements AfterContentInit {
  constructor(private store: Store<IAppState>) {}

  ngAfterContentInit() {
    this.store.dispatch(CulturesRequested());
  }
}
