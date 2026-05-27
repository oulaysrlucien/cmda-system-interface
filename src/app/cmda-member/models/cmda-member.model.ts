export interface CmdaMember {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  birthday: string;
  profession: string;
  status: string;
  fraternityId?: number;
  fraternityName?: string;
  regionId?: number;
  regionName?: string;
  provinceId?: number;
  provinceName?: string;
}
