import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  showSidebar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
}
