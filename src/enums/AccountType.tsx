import { NotFoundEnumValueError } from "../errors/NotFoundEnumValueError";

export enum AccountType {
  artist = "artist",
  enterprise = "enterprise",
}

export class AccountTypesUtil {
  static parse(accountType: string): AccountType | never {
    switch (accountType) {
      case "artist":
        return AccountType.artist;
      case "enterprise":
        return AccountType.enterprise;
      default:
        return NotFoundEnumValueError.throw();
    }
  }
}
