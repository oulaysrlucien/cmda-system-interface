export interface Province {
  id: number;
  name: string;
  description?: string;
  archived?: boolean;
  regions?: Region[];
}

export interface Region {
  id: number;
  name: string;
  description?: string;
  archived?: boolean;
  provinceId?: number;
  fraternities?: Fraternity[];
}

export interface Fraternity {
  id: number;
  name: string;
  description?: string;
  archived?: boolean;
  regionId?: number;
  members?: unknown[];
}

export interface ProvincePayload {
  name: string;
  description?: string;
}

export interface RegionPayload {
  name: string;
  description?: string;
  provinceId: number;
}

export interface FraternityPayload {
  name: string;
  description?: string;
  regionId: number;
}
