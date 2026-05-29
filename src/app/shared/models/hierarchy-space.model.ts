export interface HierarchyMetric {
  label: string;
  value: string;
  icon: string;
}

export interface HierarchyItem {
  name: string;
  location: string;
  image: string;
  description: string;
  metrics: string[];
  route?: string;
  actionLabel?: string;
}

export interface HierarchySideItem {
  date: string;
  title: string;
  subtitle: string;
}

export interface HierarchySpaceViewModel {
  mode: 'province' | 'region' | 'fraternity';
  eyebrow: string;
  title: string;
  subtitle: string;
  heroImage: string;
  managerTitle: string;
  managerName: string;
  collectionTitle: string;
  collectionSubtitle: string;
  addLabel: string;
  metrics: HierarchyMetric[];
  items: HierarchyItem[];
  events: HierarchySideItem[];
  documents: HierarchySideItem[];
}
