import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrl: './dashboard-container.component.sass',
  standalone: true,
  imports: [RouterOutlet],
})
export class DashboardContainerComponent {}
