import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface HierarchyMetric {
  label: string;
  value: string;
  icon: string;
}

interface HierarchyItem {
  name: string;
  location: string;
  image: string;
  description: string;
  metrics: string[];
  route: string;
}

interface SideItem {
  date: string;
  title: string;
  subtitle: string;
}

@Component({
  selector: 'app-hierarchy-space',
  templateUrl: './hierarchy-space.component.html',
  styleUrls: ['./hierarchy-space.component.css']
})
export class HierarchySpaceComponent {
  constructor(private route: ActivatedRoute) {}

  get mode(): 'province' | 'region' | 'fraternity' {
    return this.route.snapshot.data['mode'] || 'fraternity';
  }

  get eyebrow(): string {
    return this.route.snapshot.data['eyebrow'];
  }

  get title(): string {
    return this.route.snapshot.data['title'];
  }

  get subtitle(): string {
    return this.route.snapshot.data['subtitle'];
  }

  get heroImage(): string {
    return this.route.snapshot.data['heroImage'];
  }

  get managerTitle(): string {
    return this.route.snapshot.data['managerTitle'];
  }

  get managerName(): string {
    return this.route.snapshot.data['managerName'];
  }

  get collectionTitle(): string {
    return this.route.snapshot.data['collectionTitle'];
  }

  get collectionSubtitle(): string {
    return this.route.snapshot.data['collectionSubtitle'];
  }

  get addLabel(): string {
    return this.route.snapshot.data['addLabel'];
  }

  get metrics(): HierarchyMetric[] {
    return this.route.snapshot.data['metrics'] || [];
  }

  get items(): HierarchyItem[] {
    return this.route.snapshot.data['items'] || [];
  }

  get events(): SideItem[] {
    return this.route.snapshot.data['events'] || [];
  }

  get documents(): SideItem[] {
    return this.route.snapshot.data['documents'] || [];
  }
}
