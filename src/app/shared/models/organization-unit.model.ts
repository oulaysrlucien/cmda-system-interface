export interface Province {
  id: number;
  name: string;
  description?: string;
}

export interface Region {
  id: number;
  name: string;
  description?: string;
  provinceId?: number;
}

export interface Fraternity {
  id: number;
  name: string;
  description?: string;
  regionId?: number;
}
