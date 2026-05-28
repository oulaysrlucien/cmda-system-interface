import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-public-layout',
  templateUrl: './public-layout.component.html',
  styleUrls: ['./public-layout.component.css']
})
export class PublicLayoutComponent {
  constructor(private router: Router) {}

  get isAuthPage(): boolean {
    const path = this.router.url.split('?')[0].split('#')[0];
    return path === '/login';
  }
}
