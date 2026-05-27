export interface UserDTO {
  id: number;
  username: string;
  role: string;
  warningMessage?: string;
  provinceId?: number;
  regionId?: number;
  fraternityId?: number;
}
