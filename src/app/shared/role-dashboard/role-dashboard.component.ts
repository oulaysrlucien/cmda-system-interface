import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface DashboardStat {
  label: string;
  value: string;
  icon: string;
}

interface DashboardAction {
  label: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-role-dashboard',
  templateUrl: './role-dashboard.component.html',
  styleUrls: ['./role-dashboard.component.css']
})
export class RoleDashboardComponent {
  constructor(private route: ActivatedRoute) {}

  get eyebrow(): string {
    return this.route.snapshot.data['eyebrow'] || 'Espace connecte';
  }

  get title(): string {
    return this.route.snapshot.data['title'] || 'Tableau de bord';
  }

  get description(): string {
    return this.route.snapshot.data['description'] || 'Suivi de la mission CMDA DEV.';
  }

  get scope(): string {
    return this.route.snapshot.data['scope'] || 'Perimetre utilisateur';
  }

  get stats(): DashboardStat[] {
    return this.route.snapshot.data['stats'] || [];
  }

  get actions(): DashboardAction[] {
    return this.route.snapshot.data['actions'] || [];
  }
}
