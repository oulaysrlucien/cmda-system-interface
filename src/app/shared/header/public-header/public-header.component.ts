import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-public-header',
  templateUrl: './public-header.component.html',
  styleUrls: ['./public-header.component.css']
})
export class PublicHeaderComponent {
  constructor(private router: Router) {}

  get isHomePage(): boolean {
    const path = this.router.url.split('?')[0].split('#')[0];
    return path === '/';
  }
}
