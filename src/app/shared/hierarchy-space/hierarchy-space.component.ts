import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, map, of, switchMap } from 'rxjs';
import { HierarchyItem, HierarchyMetric, HierarchySideItem, HierarchySpaceViewModel } from '../models/hierarchy-space.model';
import { CurrentUserScope } from '../models/current-user-scope.model';
import { Fraternity, Region } from '../models/organization-unit.model';
import { CurrentUserScopeService } from '../services/current-user-scope.service';
import { FraternityService } from '../services/fraternity.service';
import { RegionService } from '../services/region.service';
import { HIERARCHY_SPACE_DEFAULTS } from './hierarchy-space.defaults';
import { AuthService } from '../../user-management/services/auth.service';

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

  private readonly fraternityImages = [
    'assets/home/region-city-photo.png',
    'assets/home/cmda-community-hero.png',
    'assets/home/region-alps-photo.png'
  ];

  constructor(
    private route: ActivatedRoute,
    private currentUserScopeService: CurrentUserScopeService,
    private regionService: RegionService,
    private fraternityService: FraternityService,
    private authService: AuthService
  ) {
    this.viewModel = this.buildViewModelFromRoute();
  }

  ngOnInit(): void {
    if (this.mode === 'province') {
      this.loadProvinceSpace();
      return;
    }

    if (this.mode === 'region') {
      this.loadRegionSpace();
      return;
    }

    if (this.mode === 'fraternity') {
      this.loadFraternitySpace();
    }
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

  get canManageStructures(): boolean {
    return this.authService.hasRole('ADMIN');
  }

  get loadingLabel(): string {
    if (this.mode === 'province') return 'Chargement des regions de la province...';
    if (this.mode === 'region') return 'Chargement des fraternites de la region...';
    return 'Chargement de la fraternite...';
  }

  private loadProvinceSpace(): void {
    this.isLoading = true;
    this.loadError = '';

    forkJoin({
      scope: this.currentUserScopeService.getScope(),
      regions: this.regionService.getCurrentUserProvinceRegions()
    }).pipe(
      switchMap(({ scope, regions }) => {
        if (!regions.length) {
          return of({ scope, regions });
        }

        return forkJoin(
          regions.map(region =>
            this.fraternityService.getScopedRegionFraternities(region.id).pipe(
              map(fraternities => ({ ...region, fraternities }))
            )
          )
        ).pipe(map(enrichedRegions => ({ scope, regions: enrichedRegions })));
      })
    ).subscribe({
      next: ({ scope, regions }) => {
        this.viewModel = {
          ...this.viewModel,
          eyebrow: scope.province?.name || this.viewModel.eyebrow,
          title: `Bienvenue, ${scope.username}`,
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
        queryParams: { regionId: region.id },
        actionLabel: 'Voir la region'
      };
    });
  }

  private loadRegionSpace(): void {
    this.isLoading = true;
    this.loadError = '';

    this.currentUserScopeService.getScope().pipe(
      switchMap(scope => {
        const routeRegionId = Number(this.route.snapshot.queryParamMap.get('regionId'));
        const selectedRegionId = routeRegionId || scope.region?.id;

        if (!selectedRegionId) {
          return this.regionService.getCurrentUserProvinceRegions().pipe(
            switchMap(regions => {
              const firstRegionId = regions[0]?.id;

              return forkJoin({
                scope: of(scope),
                regions: of(regions),
                fraternities: firstRegionId ? this.fraternityService.getScopedRegionFraternities(firstRegionId) : of([])
              });
            })
          );
        }

        const regions$ = routeRegionId ? this.regionService.getCurrentUserProvinceRegions() : of([]);
        const fraternities$ = this.fraternityService.getScopedRegionFraternities(selectedRegionId);

        return forkJoin({
          scope: of(scope),
          regions: regions$,
          fraternities: fraternities$
        });
      })
    ).subscribe({
      next: ({ scope, regions, fraternities }) => {
        const routeRegionId = Number(this.route.snapshot.queryParamMap.get('regionId'));
        const selectedRegion = this.resolveSelectedRegion(scope, regions, routeRegionId);
        const membersCount = this.countFraternityMembers(fraternities);

        this.viewModel = {
          ...this.viewModel,
          eyebrow: selectedRegion?.name || scope.region?.name || this.viewModel.eyebrow,
          title: selectedRegion?.name || scope.region?.name || this.viewModel.title,
          managerName: scope.username || this.viewModel.managerName,
          metrics: [
            { label: 'Fraternites actives', value: String(fraternities.length), icon: 'bi-house-heart' },
            { label: 'Membres au total', value: String(membersCount), icon: 'bi-people' },
            { label: 'Responsables', value: this.viewModel.metrics[2]?.value || '0', icon: 'bi-person-check' },
            { label: 'Activites a venir', value: this.viewModel.metrics[3]?.value || '0', icon: 'bi-calendar-event' }
          ],
          items: this.mapFraternitiesToItems(fraternities)
        };
        this.isLoading = false;
      },
      error: error => {
        console.error('Erreur lors du chargement dynamique de l espace regional', error);
        this.loadError = 'Impossible de charger les donnees dynamiques de la region. Affichage de secours.';
        this.isLoading = false;
      }
    });
  }

  private resolveSelectedRegion(
    scope: CurrentUserScope,
    regions: Region[],
    routeRegionId: number
  ): Region | null {
    if (routeRegionId) {
      return regions.find(region => region.id === routeRegionId) || null;
    }

    if (regions.length) {
      return regions[0];
    }

    return scope.region ? {
      id: scope.region.id,
      name: scope.region.name,
      description: scope.region.description,
      provinceId: scope.province?.id
    } : null;
  }

  private mapFraternitiesToItems(fraternities: Fraternity[]): HierarchyItem[] {
    if (!fraternities.length) {
      return [];
    }

    return fraternities.map((fraternity, index) => {
      const membersCount = fraternity.members?.length || 0;

      return {
        name: fraternity.name,
        location: `Fraternite #${fraternity.id}`,
        image: this.fraternityImages[index % this.fraternityImages.length],
        description: fraternity.description || 'Fraternite rattachee a cette region.',
        metrics: [
          `${membersCount} membres`,
          'Responsable a consolider',
          'Activites a consolider'
        ],
        route: '/app/berger/fraternity',
        queryParams: { fraternityId: fraternity.id },
        actionLabel: 'Voir la fraternite'
      };
    });
  }

  private countFraternityMembers(fraternities: Fraternity[]): number {
    return fraternities.reduce((total, fraternity) => total + (fraternity.members?.length || 0), 0);
  }

  private loadFraternitySpace(): void {
    this.isLoading = true;
    this.loadError = '';

    this.currentUserScopeService.getScope().pipe(
      switchMap(scope => {
        const routeFraternityId = Number(this.route.snapshot.queryParamMap.get('fraternityId'));
        const fraternity$ = routeFraternityId
          ? this.fraternityService.getScopedFraternity(routeFraternityId)
          : this.fraternityService.getCurrentUserFraternityDetails();

        return forkJoin({
          scope: of(scope),
          fraternity: fraternity$
        });
      })
    ).subscribe({
      next: ({ scope, fraternity }) => {
        const membersCount = fraternity.members?.length || 0;

        this.viewModel = {
          ...this.viewModel,
          eyebrow: fraternity.name || scope.fraternity?.name || this.viewModel.eyebrow,
          title: fraternity.name || scope.fraternity?.name || this.viewModel.title,
          managerName: scope.username || this.viewModel.managerName,
          metrics: [
            { label: 'Membres', value: String(membersCount), icon: 'bi-people' },
            { label: 'Responsables', value: this.viewModel.metrics[1]?.value || '0', icon: 'bi-person-check' },
            { label: 'Groupes', value: this.viewModel.metrics[2]?.value || '3', icon: 'bi-collection' },
            { label: 'Activites', value: this.viewModel.metrics[3]?.value || '8', icon: 'bi-calendar-event' }
          ],
          items: this.viewModel.items
        };
        this.isLoading = false;
      },
      error: error => {
        console.error('Erreur lors du chargement dynamique de l espace fraternite', error);
        this.loadError = 'Impossible de charger les donnees dynamiques de la fraternite. Affichage de secours.';
        this.isLoading = false;
      }
    });
  }

  private buildViewModelFromRoute(): HierarchySpaceViewModel {
    const mode = this.route.snapshot.data['mode'] || 'fraternity';
    const defaults = HIERARCHY_SPACE_DEFAULTS[mode as HierarchySpaceViewModel['mode']];

    return {
      ...defaults,
      mode,
      eyebrow: this.route.snapshot.data['eyebrow'] || defaults.eyebrow,
      title: this.route.snapshot.data['title'] || defaults.title,
      subtitle: this.route.snapshot.data['subtitle'] || defaults.subtitle,
      heroImage: this.route.snapshot.data['heroImage'] || defaults.heroImage,
      managerTitle: this.route.snapshot.data['managerTitle'] || defaults.managerTitle,
      managerName: this.route.snapshot.data['managerName'] || defaults.managerName,
      collectionTitle: this.route.snapshot.data['collectionTitle'] || defaults.collectionTitle,
      collectionSubtitle: this.route.snapshot.data['collectionSubtitle'] || defaults.collectionSubtitle,
      addLabel: this.route.snapshot.data['addLabel'] || defaults.addLabel,
      metrics: this.route.snapshot.data['metrics'] || defaults.metrics,
      items: this.route.snapshot.data['items'] || defaults.items,
      events: this.route.snapshot.data['events'] || defaults.events,
      documents: this.route.snapshot.data['documents'] || defaults.documents
    };
  }
}
