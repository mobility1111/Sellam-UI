import { AccountType } from "../models/enums/AccountType";

export interface ILoginInfo {
  token: string;
}

export interface IUser {
  name: string;
  email: string;
  family_name: string;
  given_name: string;
  sub: string;
  exp: number;
  accountType: AccountType;
  unique_name: string;
}