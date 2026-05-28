import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  regions = [
    {
      name: 'Region 1',
      image: 'assets/home/region-alps.svg',
      icon: 'bi-geo-alt-fill',
      description: 'Une region fraternelle au service de la mission et de la communion.'
    },
    {
      name: 'Region 2',
      image: 'assets/home/region-city.svg',
      icon: 'bi-people-fill',
      description: 'Ensemble pour grandir dans la foi et rayonner par l amour.'
    },
    {
      name: 'Region 3',
      image: 'assets/home/region-coast.svg',
      icon: 'bi-cross',
      description: 'Portes par l Esprit, nous avancons dans l unite.'
    }
  ];

  graces = [
    {
      title: 'La grace de la contemplation',
      icon: 'bi-person-heart',
      description: 'Cultiver une relation profonde avec Dieu dans la priere, le silence et l adoration.'
    },
    {
      title: 'La grace de l evangelisation',
      icon: 'bi-megaphone-fill',
      description: 'Annoncer la Bonne Nouvelle avec joie, audace et proximite fraternelle.'
    },
    {
      title: 'La grace du developpement',
      icon: 'bi-graph-up-arrow',
      description: 'Developper nos talents et nos ressources pour servir le bien commun.'
    }
  ];
}
