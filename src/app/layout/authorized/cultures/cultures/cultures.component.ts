import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../../../store/app.state';
import { Router } from '@angular/router';
import { CultureService } from '../../../../shared/services/culture.service';
import { selectCultures } from '../../../../store/cultures/cultures.selectors';

@Component({
  selector: 'app-cultures',
  templateUrl: './cultures.component.html',
  styleUrls: ['./cultures.component.sass']
})
export class CulturesComponent implements OnInit {
  inProgress: boolean = false;
  cultures: any = [];
  constructor(private store: Store<IAppState>, private cultureService: CultureService, private router: Router) {}

  ngOnInit() {
    this.inProgress = true;
    this.store.pipe(select(selectCultures)).subscribe((cultures) => {
      this.cultures = cultures?.data;
      this.inProgress = false;
    });
  }
}
