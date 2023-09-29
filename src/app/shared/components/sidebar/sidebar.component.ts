import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { SidebarService } from './sidebar.service';
import { Router } from '@angular/router';
import { isEmpty } from 'lodash';
import { UserLoggedOut, UserRequested } from '../../../store/user/user.actions';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../store/app.state';
import { AuthService } from '../../services/auth.service';
import { IUser, UserService } from '../../services/user.service';
import { Observable } from 'rxjs';

export interface IMenu {
  key?: string;
  label?: string;
  active?: boolean;
  routerLink?: string;
  href?: string;
  disabled?: boolean;
  icon?: string;
  hide?: boolean;
  type?: 'itemMenu' | 'expansion';
  subMenus?: {
    key?: string;
    label?: string;
    active?: boolean;
    routerLink?: string;
    href?: string;
    disabled?: boolean;
    icon?: string;
    hide?: boolean;
    tooltip?: string;
    animation?: string;
  }[];
  upBorder?: boolean;
  tooltip?: string;
  animation?: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;
  showSideNav: boolean;
  menus: IMenu[];
  menuTitle: string = '';
  currentUser: Observable<IUser>;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private sidebarService: SidebarService,
    private store: Store<IAppState>,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.store.dispatch(UserRequested());
    this.sidebarService.showSidebar.subscribe((result) => (this.showSideNav = result));
    this.currentUser = this.userService.currentLoggedUser;
    this.initMenu();
    // this.menuTitle = this.menus.find((item) => item.routerLink.includes(this.router.url.replace('/', '')))?.label;
    this.menuTitle = 'FarmAgenda';
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
        icon: 'filter_list',
        routerLink: 'dashboard/start',
        hide: false,
        disabled: true,
        type: 'itemMenu'
      },
      {
        key: 'messages',
        label: 'Messages',
        icon: 'message',
        routerLink: 'd',
        hide: false,
        disabled: true,
        type: 'itemMenu'
      },
      {
        key: 'products',
        label: 'Products',
        icon: 'shopping_basket',
        routerLink: 'c',
        hide: false,
        disabled: true,
        type: 'itemMenu'
      },
      {
        key: 'parcels',
        label: 'Parcels',
        icon: 'map',
        hide: false,
        type: 'itemMenu',
        routerLink: 'fields'
      },
      {
        key: 'cultures',
        label: 'Cultures',
        icon: 'landscape',
        hide: false,
        type: 'itemMenu',
        routerLink: 'cultures'
      },
      {
        key: 'network',
        label: 'Network',
        icon: 'people',
        routerLink: 'b',
        hide: false,
        disabled: true,
        type: 'itemMenu'
      },
      {
        key: 'settings',
        label: 'Settings',
        icon: 'settings',
        routerLink: 'a',
        hide: false,
        disabled: true,
        type: 'itemMenu',
        upBorder: true
      }
    ];
  }

  title(menu: any) {
    if (menu.disabled) {
      return;
    }
    this.menuTitle = menu.label;
  }

  onLogOut() {
    this.store.dispatch(UserLoggedOut());
    this.authService.logOut();
  }
}
