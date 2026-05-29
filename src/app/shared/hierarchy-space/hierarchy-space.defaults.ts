import { HierarchySpaceViewModel } from '../models/hierarchy-space.model';

export const HIERARCHY_SPACE_DEFAULTS: Record<HierarchySpaceViewModel['mode'], HierarchySpaceViewModel> = {
  province: {
    mode: 'province',
    eyebrow: 'Province Europe',
    title: 'Bienvenue, Pere Antoine',
    subtitle: 'Ensemble, batissons une communaute unie dans la foi et l amour.',
    heroImage: 'assets/home/region-city.svg',
    managerTitle: 'Provincial',
    managerName: 'Pere Antoine Kouassi',
    collectionTitle: 'Mes regions',
    collectionSubtitle: 'Gerez et suivez les regions de votre province.',
    addLabel: 'Ajouter une region',
    metrics: [
      { label: 'Regions actives', value: '0', icon: 'bi-geo-alt' },
      { label: 'Fraternites au total', value: '0', icon: 'bi-house-heart' },
      { label: 'Membres au total', value: '0', icon: 'bi-people' },
      { label: 'Responsables engages', value: '0', icon: 'bi-person-check' }
    ],
    items: [],
    events: [
      { date: '25 MAI', title: 'Recollection provinciale', subtitle: 'Samedi 25 mai 2024' },
      { date: '08 JUIN', title: 'Formation des responsables', subtitle: 'Paris, France' },
      { date: '15 JUIN', title: 'Journee de priere provinciale', subtitle: 'Bruxelles, Belgique' }
    ],
    documents: [
      { date: 'PDF', title: 'Rapport activites - Avril 2024.pdf', subtitle: 'PDF - 2.1 Mo' },
      { date: 'PDF', title: 'Synthese regions - 2024.pdf', subtitle: 'PDF - 1.8 Mo' }
    ]
  },
  region: {
    mode: 'region',
    eyebrow: 'Region rattachee',
    title: 'Region Saint Jean',
    subtitle: 'Ensemble, marchons a la suite du Christ.',
    heroImage: 'assets/home/region-alps.svg',
    managerTitle: 'Responsable regional',
    managerName: 'Fr. Jean-Baptiste N Guessan',
    collectionTitle: 'Mes fraternites',
    collectionSubtitle: 'Gerez et suivez les fraternites de votre region.',
    addLabel: 'Ajouter une fraternite',
    metrics: [
      { label: 'Fraternites actives', value: '0', icon: 'bi-house-heart' },
      { label: 'Membres au total', value: '0', icon: 'bi-people' },
      { label: 'Responsables', value: '0', icon: 'bi-person-check' },
      { label: 'Activites a venir', value: '0', icon: 'bi-calendar-event' }
    ],
    items: [],
    events: [
      { date: '25 MAI', title: 'Recollection regionale', subtitle: 'Lyon, France' },
      { date: '08 JUIN', title: 'Formation des responsables', subtitle: 'Paris, France' },
      { date: '15 JUIN', title: 'Journee de priere regionale', subtitle: 'Marseille, France' }
    ],
    documents: [
      { date: 'PDF', title: 'Guide du responsable regional.pdf', subtitle: 'PDF - 2.4 Mo' },
      { date: 'PDF', title: 'Plan action 2024 - Region.pdf', subtitle: 'PDF - 1.8 Mo' }
    ]
  },
  fraternity: {
    mode: 'fraternity',
    eyebrow: 'Ma fraternite',
    title: 'Fraternite Saint Paul',
    subtitle: 'Ensemble, marchons a la suite du Christ.',
    heroImage: 'assets/home/cmda-community-hero.png',
    managerTitle: 'Berger de fraternite',
    managerName: 'Fr. Antoine Kouassi',
    collectionTitle: 'Groupes et services',
    collectionSubtitle: 'Suivez la vie de votre fraternite avant la liste des membres.',
    addLabel: 'Ajouter un groupe',
    metrics: [
      { label: 'Membres', value: '0', icon: 'bi-people' },
      { label: 'Responsables', value: '0', icon: 'bi-person-check' },
      { label: 'Groupes', value: '3', icon: 'bi-collection' },
      { label: 'Activites', value: '8', icon: 'bi-calendar-event' }
    ],
    items: [
      {
        name: 'Jeunes Serviteurs',
        location: 'Groupe de service',
        image: 'assets/home/cmda-community-hero.png',
        description: 'Service des jeunes et accueil.',
        metrics: ['14 membres', '2 responsables', 'Actif'],
        actionLabel: 'Statique MVP'
      },
      {
        name: 'Chorale',
        location: 'Groupe liturgique',
        image: 'assets/home/region-city.svg',
        description: 'Animation des temps de priere.',
        metrics: ['11 membres', '1 responsable', 'Actif'],
        actionLabel: 'Statique MVP'
      },
      {
        name: 'Catechese',
        location: 'Formation',
        image: 'assets/home/region-alps.svg',
        description: 'Transmission et accompagnement.',
        metrics: ['17 membres', '3 responsables', 'Actif'],
        actionLabel: 'Statique MVP'
      }
    ],
    events: [
      { date: '12 MAR', title: 'Reunion de fraternite', subtitle: 'Salle paroissiale' },
      { date: '19 MAR', title: 'Temps de priere', subtitle: 'Chapelle Saint Paul' }
    ],
    documents: [
      { date: 'PDF', title: 'Charte de la fraternite.pdf', subtitle: 'PDF - 1.2 Mo' },
      { date: 'PDF', title: 'Planning des activites.pdf', subtitle: 'PDF - 640 Ko' }
    ]
  }
};
