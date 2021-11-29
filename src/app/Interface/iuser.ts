import { IAddress } from "./iaddress";

export interface IUser {
  userId : number,
  username : string,
  uPassword : string,
  Email? : string,
  UTLF? : number,
  Roleid? : number,
  AddressId?: number,
  Address? : IAddress
}
