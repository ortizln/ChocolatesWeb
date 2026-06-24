import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SidebarService {
  private collapsedSubject = new BehaviorSubject<boolean>(window.innerWidth < 1200);
  private mobileOpenSubject = new BehaviorSubject<boolean>(false);

  collapsed$ = this.collapsedSubject.asObservable();
  mobileOpen$ = this.mobileOpenSubject.asObservable();

  toggleCollapsed() {
    this.collapsedSubject.next(!this.collapsedSubject.value);
  }

  setCollapsed(value: boolean) {
    this.collapsedSubject.next(value);
  }

  toggleMobile() {
    this.mobileOpenSubject.next(!this.mobileOpenSubject.value);
  }

  closeMobile() {
    this.mobileOpenSubject.next(false);
  }
}
