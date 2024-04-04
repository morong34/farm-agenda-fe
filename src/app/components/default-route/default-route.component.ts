import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  template: '',
  standalone: true,
})
export class DefaultRouteComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void | Promise<any> {
    const token: string | null = localStorage.getItem('auth_token');

    if (!token) {
      return this.router.navigate(['auth/login']);
    }
    const isExpired = false;
    if (isExpired) {
      return this.router.navigate(['auth/login']);
    }
    this.router.navigate(['parcels/']);
  }
}
