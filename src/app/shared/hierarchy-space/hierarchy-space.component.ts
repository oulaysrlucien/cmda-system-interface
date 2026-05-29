import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { HierarchyItem, HierarchyMetric, HierarchySideItem, HierarchySpaceViewModel } from '../models/hierarchy-space.model';
import { Region } from '../models/organization-unit.model';
import { CurrentUserScopeService } from '../services/current-user-scope.service';
import { RegionService } from '../services/region.service';

@Component({
  selector: 'app-hierarchy-space',
  templateUrl: './hierarchy-space.component.html',
  styleUrls: ['./hierarchy-space.component.css']
})
export class HierarchySpaceComponent implements OnInit {
  viewModel: HierarchySpaceViewModel;
  isLoading = false;
  loadError = '';

  private readonly regionImages = [
    'assets/home/region-alps-photo.png',
    'assets/home/region-city-photo.png',
    'assets/home/region-coast-photo.png'
  ];

  constructor(
    private route: ActivatedRoute,
    private currentUserScopeService: CurrentUserScopeService,
    private regionService: RegionService
  ) {
    this.viewModel = this.buildViewModelFromRoute();
  }

  ngOnInit(): void {
    if (this.mode !== 'province') {
      return;
    }

    this.loadProvinceSpace();
  }

  get mode(): 'province' | 'region' | 'fraternity' {
    return this.viewModel.mode;
  }

  get eyebrow(): string {
    return this.viewModel.eyebrow;
  }

  get title(): string {
    return this.viewModel.title;
  }

  get subtitle(): string {
    return this.viewModel.subtitle;
  }

  get heroImage(): string {
    return this.viewModel.heroImage;
  }

  get managerTitle(): string {
    return this.viewModel.managerTitle;
  }

  get managerName(): string {
    return this.viewModel.managerName;
  }

  get collectionTitle(): string {
    return this.viewModel.collectionTitle;
  }

  get collectionSubtitle(): string {
    return this.viewModel.collectionSubtitle;
  }

  get addLabel(): string {
    return this.viewModel.addLabel;
  }

  get metrics(): HierarchyMetric[] {
    return this.viewModel.metrics;
  }

  get items(): HierarchyItem[] {
    return this.viewModel.items;
  }

  get events(): HierarchySideItem[] {
    return this.viewModel.events;
  }

  get documents(): HierarchySideItem[] {
    return this.viewModel.documents;
  }

  private loadProvinceSpace(): void {
    this.isLoading = true;
    this.loadError = '';

    forkJoin({
      scope: this.currentUserScopeService.getScope(),
      regions: this.regionService.getCurrentUserProvinceRegions()
    }).subscribe({
      next: ({ scope, regions }) => {
        this.viewModel = {
          ...this.viewModel,
          eyebrow: scope.province?.name || this.viewModel.eyebrow,
          managerName: scope.username || this.viewModel.managerName,
          metrics: [
            { label: 'Regions actives', value: String(scope.metrics.regionsCount), icon: 'bi-geo-alt' },
            { label: 'Fraternites au total', value: String(scope.metrics.fraternitiesCount), icon: 'bi-house-heart' },
            { label: 'Membres au total', value: String(scope.metrics.membersCount), icon: 'bi-people' },
            { label: 'Responsables engages', value: this.viewModel.metrics[3]?.value || '0', icon: 'bi-person-check' }
          ],
          items: this.mapRegionsToItems(regions)
        };
        this.isLoading = false;
      },
      error: error => {
        console.error('Erreur lors du chargement dynamique de l espace provincial', error);
        this.loadError = 'Impossible de charger les donnees dynamiques de la province. Affichage de secours.';
        this.isLoading = false;
      }
    });
  }

  private mapRegionsToItems(regions: Region[]): HierarchyItem[] {
    if (!regions.length) {
      return [];
    }

    return regions.map((region, index) => {
      const fraternitiesCount = region.fraternities?.length || 0;
      const membersCount = region.fraternities?.reduce((total, fraternity) => {
        return total + (fraternity.members?.length || 0);
      }, 0) || 0;

      return {
        name: region.name,
        location: `Region #${region.id}`,
        image: this.regionImages[index % this.regionImages.length],
        description: region.description || 'Region rattachee a votre province.',
        metrics: [
          `${fraternitiesCount} fraternites`,
          `${membersCount} membres`,
          'Responsables a consolider'
        ],
        route: '/app/regional/region',
        actionLabel: 'Voir la region'
      };
    });
  }

  private buildViewModelFromRoute(): HierarchySpaceViewModel {
    return {
      mode: this.route.snapshot.data['mode'] || 'fraternity',
      eyebrow: this.route.snapshot.data['eyebrow'],
      title: this.route.snapshot.data['title'],
      subtitle: this.route.snapshot.data['subtitle'],
      heroImage: this.route.snapshot.data['heroImage'],
      managerTitle: this.route.snapshot.data['managerTitle'],
      managerName: this.route.snapshot.data['managerName'],
      collectionTitle: this.route.snapshot.data['collectionTitle'],
      collectionSubtitle: this.route.snapshot.data['collectionSubtitle'],
      addLabel: this.route.snapshot.data['addLabel'],
      metrics: this.route.snapshot.data['metrics'] || [],
      items: this.route.snapshot.data['items'] || [],
      events: this.route.snapshot.data['events'] || [],
      documents: this.route.snapshot.data['documents'] || []
    };
  }
}
