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
      image: 'assets/home/region-alps-photo.png',
      icon: 'bi-geo-alt-fill',
      description: 'Une region fraternelle au service de la mission et de la communion.'
    },
    {
      name: 'Region 2',
      image: 'assets/home/region-city-photo.png',
      icon: 'bi-people-fill',
      description: 'Ensemble pour grandir dans la foi et rayonner par l amour.'
    },
    {
      name: 'Region 3',
      image: 'assets/home/region-coast-photo.png',
      icon: 'bi-plus-lg',
      description: 'Portes par l Esprit, nous avancons dans l unite.'
    }
  ];

  graces = [
    {
      title: 'La grâce de la contemplation',
      icon: 'bi-stars',
      description: 'Cultiver une relation profonde avec Dieu dans la prière, le silence et l’adoration.'
    },
    {
      title: 'La grâce de l’évangélisation',
      icon: 'bi-megaphone-fill',
      description: 'Annoncer la Bonne Nouvelle avec joie, audace et proximité fraternelle.'
    },
    {
      title: 'La grâce du développement',
      icon: 'bi-graph-up-arrow',
      description: 'Développer nos talents et nos ressources pour servir le bien commun.'
    }
  ];
}
