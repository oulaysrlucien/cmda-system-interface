export interface JwtPayloadDTO {
  sub?: string;
  roles?: string[] | string;
  exp?: number;
  iat?: number;
}
