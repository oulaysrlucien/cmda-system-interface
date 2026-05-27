import { RegionDTO } from './region.dto';

export interface ProvinceDTO {
  id: number;
  name: string;
  description?: string;
  regions?: RegionDTO[];
}
