import {
  ChangeDetectorRef,
  Component,
  NgZone,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { SidebarService } from '../../services/sidebar.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserLoggedOut, UserRequested } from '../../../store/user/user.actions';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../store/app.state';
import { AuthService } from '../../services/auth.service';
import { IUser, UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import {
  NgbDropdown,
  NgbDropdownToggle,
  NgbDropdownMenu,
  NgbDropdownItem,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import {
  NgOptimizedImage,
  NgFor,
  NgIf,
  NgSwitch,
  NgSwitchCase,
  AsyncPipe,
} from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CultureService } from 'app/shared/services/culture.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { icons } from 'assets/icons/fortawesome';

export interface IMenu {
  key?: string;
  label?: string;
  active?: boolean;
  routerLink?: string;
  href?: string;
  disabled?: boolean;
  icon?: IconDefinition;
  hide?: boolean;
  type?: 'itemMenu' | 'expansion';
  onClick?: boolean;
  subMenus?: {
    key?: string;
    label?: string;
    active?: boolean;
    routerLink?: string;
    href?: string;
    disabled?: boolean;
    icon?: IconDefinition;
    hide?: boolean;
    tooltip?: string;
    animation?: string;
    onClick?: boolean;
  }[];
  upBorder?: boolean;
  tooltip?: string;
  animation?: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass'],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    MatSidenavModule,
    NgOptimizedImage,
    MatListModule,
    NgFor,
    NgIf,
    NgSwitch,
    NgSwitchCase,
    RouterLink,
    MatTooltipModule,
    MatIconModule,
    MatExpansionModule,
    MatButtonModule,
    MatBadgeModule,
    NgbDropdown,
    NgbDropdownToggle,
    NgbDropdownMenu,
    NgbDropdownItem,
    RouterOutlet,
    AsyncPipe,
    FontAwesomeModule,
  ],
})
export class SidebarComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;
  showSideNav: boolean;
  menus: IMenu[];
  currentUser: Observable<IUser>;
  title: string = '';
  icons = icons;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private sidebarService: SidebarService,
    private store: Store<IAppState>,
    private authService: AuthService,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.store.dispatch(UserRequested());
    this.sidebarService.showSidebar.subscribe(
      result => (this.showSideNav = result)
    );
    this.currentUser = this.userService.currentLoggedUser;
    this.initMenu();
    this.sidebarService.title.subscribe(value => {
      this.title = value;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  initMenu(): void {
    this.menus = [
      // {
      //   key: 'dashboard',
      //   label: 'Overview',
      //   icon: 'filter_list',
      //   hide: false,
      //   type: 'expansion',
      //   disabled: false,
      //   subMenus: [
      //     {
      //       key: 'summary',
      //       label: 'Summary',
      //       icon: 'view_list',
      //       hide: false,
      //       disabled: true,
      //       routerLink: 'dashboard/start'
      //     },
      //     {
      //       key: 'summary',
      //       label: 'Custom View',
      //       icon: 'edit',
      //       hide: true,
      //       disabled: true,
      //       routerLink: 'dashboard/custom-view'
      //     }
      //   ]
      // },
      {
        key: 'dashboard',
        label: 'Overview',
        icon: this.icons['dashBoard'],
        routerLink: 'dashboard/start',
        hide: false,
        disabled: true,
        onClick: false,
        type: 'itemMenu',
      },
      {
        key: 'messages',
        label: 'Messages',
        icon: this.icons['message'],
        routerLink: 'd',
        hide: false,
        disabled: true,
        onClick: false,
        type: 'itemMenu',
      },
      {
        key: 'products',
        label: 'Products',
        icon: this.icons['basket'],
        routerLink: 'c',
        hide: false,
        disabled: true,
        onClick: false,
        type: 'itemMenu',
      },
      {
        key: 'parcels',
        label: 'Parcels',
        icon: this.icons['mapLocation'],
        hide: false,
        type: 'itemMenu',
        onClick: false,
        routerLink: 'parcels',
      },
      {
        key: 'cultures',
        label: 'Cultures',
        icon: this.icons['wheat'],
        hide: false,
        type: 'itemMenu',
        onClick: false,
        routerLink: 'cultures',
      },
      {
        key: 'network',
        label: 'Network',
        icon: this.icons['peopleGroup'],
        routerLink: 'b',
        hide: false,
        disabled: true,
        onClick: false,
        type: 'itemMenu',
      },
      {
        key: 'settings',
        label: 'Settings',
        icon: this.icons['sliders'],
        routerLink: 'a',
        hide: false,
        disabled: true,
        onClick: false,
        type: 'itemMenu',
        upBorder: true,
      },
    ];
  }

  onClick(menu: IMenu, type: 'menu' | 'subMenu', index?: number) {
    switch (type === 'menu' ? menu.key : menu.subMenus[index].key) {
      case 'based_on_key -> action':
        break;
      default:
        break;
    }
  }

  onLogOut() {
    this.store.dispatch(UserLoggedOut());
    this.authService.logOut();
  }
}
