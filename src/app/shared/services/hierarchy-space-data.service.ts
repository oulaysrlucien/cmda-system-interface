import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HierarchyMetric, HierarchySpaceViewModel } from '../models/hierarchy-space.model';
import { CurrentUserScope } from '../models/current-user-scope.model';
import { CurrentUserScopeService } from './current-user-scope.service';

@Injectable({
  providedIn: 'root'
})
export class HierarchySpaceDataService {
  constructor(private currentUserScopeService: CurrentUserScopeService) {}

  getScopeSnapshot(): Observable<CurrentUserScope> {
    return this.currentUserScopeService.getScope();
  }

  getProvinceMetrics(): Observable<HierarchyMetric[]> {
    return this.currentUserScopeService.getScope().pipe(
      map(scope => [
        { label: 'Regions actives', value: String(scope.metrics.regionsCount), icon: 'bi-geo-alt' },
        { label: 'Fraternites au total', value: String(scope.metrics.fraternitiesCount), icon: 'bi-house-heart' },
        { label: 'Membres au total', value: String(scope.metrics.membersCount), icon: 'bi-people' },
        { label: 'Province rattachee', value: scope.province ? '1' : '0', icon: 'bi-diagram-3' }
      ])
    );
  }

  getRegionMetrics(): Observable<HierarchyMetric[]> {
    return this.currentUserScopeService.getScope().pipe(
      map(scope => [
        { label: 'Fraternites actives', value: String(scope.metrics.fraternitiesCount), icon: 'bi-house-heart' },
        { label: 'Membres au total', value: String(scope.metrics.membersCount), icon: 'bi-people' },
        { label: 'Regions rattachees', value: String(scope.metrics.regionsCount), icon: 'bi-geo-alt' },
        { label: 'Province', value: scope.province ? '1' : '0', icon: 'bi-diagram-3' }
      ])
    );
  }

  getFraternityMetrics(): Observable<HierarchyMetric[]> {
    return this.currentUserScopeService.getScope().pipe(
      map(scope => [
        { label: 'Membres', value: String(scope.metrics.membersCount), icon: 'bi-people' },
        { label: 'Fraternite rattachee', value: scope.fraternity ? '1' : '0', icon: 'bi-house-heart' },
        { label: 'Groupes', value: '3', icon: 'bi-collection' },
        { label: 'Activites', value: '8', icon: 'bi-calendar-event' }
      ])
    );
  }

  mergeScopeMetrics(
    viewModel: HierarchySpaceViewModel,
    scope: CurrentUserScope
  ): HierarchySpaceViewModel {
    if (viewModel.mode === 'province') {
      return {
        ...viewModel,
        eyebrow: scope.province?.name || viewModel.eyebrow,
        metrics: [
          { label: 'Regions actives', value: String(scope.metrics.regionsCount), icon: 'bi-geo-alt' },
          { label: 'Fraternites au total', value: String(scope.metrics.fraternitiesCount), icon: 'bi-house-heart' },
          { label: 'Membres au total', value: String(scope.metrics.membersCount), icon: 'bi-people' },
          { label: 'Responsables engages', value: viewModel.metrics[3]?.value || '0', icon: 'bi-person-check' }
        ]
      };
    }

    if (viewModel.mode === 'region') {
      return {
        ...viewModel,
        eyebrow: scope.region?.name || viewModel.eyebrow,
        title: scope.region?.name || viewModel.title,
        metrics: [
          { label: 'Fraternites actives', value: String(scope.metrics.fraternitiesCount), icon: 'bi-house-heart' },
          { label: 'Membres au total', value: String(scope.metrics.membersCount), icon: 'bi-people' },
          { label: 'Responsables', value: viewModel.metrics[2]?.value || '0', icon: 'bi-person-check' },
          { label: 'Activites a venir', value: viewModel.metrics[3]?.value || '0', icon: 'bi-calendar-event' }
        ]
      };
    }

    return {
      ...viewModel,
      eyebrow: scope.fraternity?.name || viewModel.eyebrow,
      title: scope.fraternity?.name || viewModel.title,
      metrics: [
        { label: 'Membres', value: String(scope.metrics.membersCount), icon: 'bi-people' },
        { label: 'Responsables', value: viewModel.metrics[1]?.value || '0', icon: 'bi-person-check' },
        { label: 'Groupes', value: viewModel.metrics[2]?.value || '3', icon: 'bi-collection' },
        { label: 'Activites', value: viewModel.metrics[3]?.value || '8', icon: 'bi-calendar-event' }
      ]
    };
  }
}
