import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-start',
  templateUrl: './dashboard-start.component.html',
  styleUrl: './dashboard-start.component.sass',
  standalone: true,
})
export class DashboardStartComponent {
  rows = [
    { id: 1, name: 'narcis' },
    { id: 2, name: 'cristi' },
    { id: 3, name: 'vio' },
  ];
}
