import { FraternityDTO } from './fraternity.dto';
import { ProvinceDTO } from './province.dto';
import { RegionDTO } from './region.dto';

export interface UserDTO {
  id: number;
  username: string;
  role: string;
  warningMessage?: string;
  provinceId?: number;
  regionId?: number;
  fraternityId?: number;
  province?: ProvinceDTO;
  region?: RegionDTO;
  fraternity?: FraternityDTO;
}
