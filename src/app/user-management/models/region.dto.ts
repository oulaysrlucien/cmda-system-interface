import { FraternityDTO } from './fraternity.dto';

export interface RegionDTO {
  id: number;
  name: string;
  description?: string;
  provinceId?: number;
  fraternities?: FraternityDTO[];
}
