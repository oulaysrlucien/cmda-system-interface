export interface UserCreationDTO {
  username: string;
  password: string;
  role: string;
  provinceId?: number;
  regionId?: number;
  fraternityId?: number;
}
