import { Component, ViewEncapsulation } from '@angular/core';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-authorized',
  templateUrl: './authorized.component.html',
  styleUrl: './authorized.component.sass',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [SidebarComponent],
})
export class AuthorizedComponent {}
