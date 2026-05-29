export interface ScopeRef {
  id: number;
  name: string;
  description?: string;
}

export interface ScopeMetrics {
  provincesCount: number;
  regionsCount: number;
  fraternitiesCount: number;
  membersCount: number;
}

export interface CurrentUserScope {
  userId: number;
  username: string;
  role: 'ADMIN' | 'PROVINCIAL' | 'REGIONAL' | 'BERGER';
  scopeLevel: 'GLOBAL' | 'PROVINCE' | 'REGION' | 'FRATERNITY';
  province?: ScopeRef | null;
  region?: ScopeRef | null;
  fraternity?: ScopeRef | null;
  metrics: ScopeMetrics;
  readableResources: string[];
  manageableResources: string[];
}
