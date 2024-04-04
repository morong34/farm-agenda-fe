import { Injectable, WritableSignal, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  showSidebar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  title: BehaviorSubject<string> = new BehaviorSubject<string>('FarmAgenda');
}
