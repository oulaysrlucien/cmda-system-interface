import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Fraternity, Province, Region } from '../models/organization-unit.model';
import { FraternityService } from '../services/fraternity.service';
import { ProvinceService } from '../services/province.service';
import { RegionService } from '../services/region.service';

@Component({
  selector: 'app-admin-structures',
  templateUrl: './admin-structures.component.html',
  styleUrls: ['./admin-structures.component.css']
})
export class AdminStructuresComponent implements OnInit {
  provinces: Province[] = [];
  regions: Region[] = [];
  fraternities: Fraternity[] = [];
  archivedCount = 0;
  selectedProvinceId: number | null = null;
  selectedRegionId: number | null = null;
  loading = true;
  errorMessage = '';

  constructor(
    private provinceService: ProvinceService,
    private regionService: RegionService,
    private fraternityService: FraternityService
  ) {}

  ngOnInit(): void {
    this.loadStructures();
  }

  get selectedProvince(): Province | undefined {
    return this.provinces.find(province => province.id === this.selectedProvinceId);
  }

  get selectedRegion(): Region | undefined {
    return this.regions.find(region => region.id === this.selectedRegionId);
  }

  get visibleRegions(): Region[] {
    if (this.selectedProvinceId === null) {
      return this.regions;
    }

    return this.regions.filter(region => region.provinceId === this.selectedProvinceId);
  }

  get visibleFraternities(): Fraternity[] {
    if (this.selectedRegionId !== null) {
      return this.fraternities.filter(fraternity => fraternity.regionId === this.selectedRegionId);
    }

    const regionIds = new Set(this.visibleRegions.map(region => region.id));
    return this.fraternities.filter(fraternity => regionIds.has(fraternity.regionId ?? -1));
  }

  loadStructures(): void {
    this.loading = true;
    this.errorMessage = '';

    forkJoin({
      provinces: this.provinceService.getAll(),
      regions: this.regionService.getAll(),
      fraternities: this.fraternityService.getAll(),
      archivedProvinces: this.provinceService.getArchived(),
      archivedRegions: this.regionService.getArchived(),
      archivedFraternities: this.fraternityService.getArchived()
    }).subscribe({
      next: response => {
        this.provinces = response.provinces;
        this.regions = response.regions;
        this.fraternities = response.fraternities;
        this.archivedCount =
          response.archivedProvinces.length +
          response.archivedRegions.length +
          response.archivedFraternities.length;
        this.keepSelectionsConsistent();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Impossible de charger les structures. Verifiez que le serveur est disponible.';
      }
    });
  }

  selectProvince(provinceId: number): void {
    this.selectedProvinceId = this.selectedProvinceId === provinceId ? null : provinceId;
    this.selectedRegionId = null;
  }

  selectRegion(regionId: number): void {
    const region = this.regions.find(item => item.id === regionId);

    if (!region) {
      return;
    }

    this.selectedProvinceId = region.provinceId ?? null;
    this.selectedRegionId = this.selectedRegionId === regionId ? null : regionId;
  }

  clearSelection(): void {
    this.selectedProvinceId = null;
    this.selectedRegionId = null;
  }

  countRegions(provinceId: number): number {
    return this.regions.filter(region => region.provinceId === provinceId).length;
  }

  countFraternitiesForProvince(provinceId: number): number {
    const regionIds = new Set(
      this.regions
        .filter(region => region.provinceId === provinceId)
        .map(region => region.id)
    );

    return this.fraternities.filter(fraternity => regionIds.has(fraternity.regionId ?? -1)).length;
  }

  countFraternities(regionId: number): number {
    return this.fraternities.filter(fraternity => fraternity.regionId === regionId).length;
  }

  private keepSelectionsConsistent(): void {
    if (!this.provinces.some(province => province.id === this.selectedProvinceId)) {
      this.selectedProvinceId = null;
    }

    if (!this.regions.some(region => region.id === this.selectedRegionId)) {
      this.selectedRegionId = null;
    }
  }
}
