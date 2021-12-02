export interface ITokenPayload {
  aud?: string | string[] | undefined;  //(audience) claim
  exp?: number | undefined;             //(Expiration time) claim
  iat?: number | undefined;             //(IssuedAt time) claim
  iss?: string | undefined;             //(issuer) claim
  jti?: string | undefined;             //() claim
  nbf?: number | undefined;             //(Not-Before time) claim
  sub?: string | undefined;             //(Subject) claim


  id?: number | undefined;
  userName?: string | undefined;
}
