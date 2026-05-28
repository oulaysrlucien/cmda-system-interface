import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-public-page',
  templateUrl: './public-page.component.html',
  styleUrls: ['./public-page.component.css']
})
export class PublicPageComponent {
  constructor(private route: ActivatedRoute) {}

  get title(): string {
    return this.route.snapshot.data['title'] || 'CMDA DEV';
  }

  get description(): string {
    return this.route.snapshot.data['description'] || 'Cette page sera enrichie dans les prochaines etapes R5.';
  }
}
