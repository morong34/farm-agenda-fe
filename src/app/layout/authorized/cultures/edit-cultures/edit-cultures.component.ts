import { Component, OnInit } from '@angular/core';
import { FormMode } from '../../../../shared/helpers/forms/baseFormComponent';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SidebarService } from 'app/shared/services/sidebar.service';
import { config } from '../../const';
import {
  ICulture,
  ICultureResponse,
} from 'app/shared/services/culture.service';
import { ActionBarComponent } from 'app/shared/components/action-bar/action-bar.component';
import { ActionBarActionComponent } from 'app/shared/components/action-bar/action-bar-action/action-bar-action.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { icons } from 'assets/icons/fortawesome';
import { LoaderComponent } from 'app/shared/components/loader/loader.component';
import { IParcelResponse } from 'app/shared/services/parcels.service';

@Component({
  selector: 'app-edit-cultures',
  templateUrl: './edit-cultures.component.html',
  styleUrl: './edit-cultures.component.sass',
  standalone: true,
  imports: [
    ActionBarComponent,
    ActionBarActionComponent,
    FontAwesomeModule,
    LoaderComponent,
    RouterLink,
  ],
})
export class EditCulturesComponent implements OnInit {
  culture: ICulture;
  field: IParcelResponse['data'];
  config: config = { form: { mode: FormMode.Edit }, tab: 'edit-culture' };
  formReady: boolean = false;
  icons = icons;

  constructor(
    private route: ActivatedRoute,
    private sideBarService: SidebarService
  ) {}

  ngOnInit() {
    this.sideBarService.title.next('Edit Cultures');
    this.route.data.subscribe((response: { culture: ICultureResponse }) => {
      this.culture = response.culture.data;
      this.field = response.culture.included.find(
        (item: any) => item.type === 'parcels'
      );
      this.formReady = true;
    });
  }

  save() {}
}
