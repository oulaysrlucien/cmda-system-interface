// src/app/cmda-member/models/cmda-member.model.ts
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
}
