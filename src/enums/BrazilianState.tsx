import { NotFoundEnumValueError } from "../errors/NotFoundEnumValueError";

export enum BrazilianState {
  AC = "AC",
  AL = "AL",
  AM = "AM",
  AP = "AP",
  BA = "BA",
  CE = "CE",
  DF = "DF",
  ES = "ES",
  GO = "GO",
  MA = "MA",
  MG = "MG",
  MS = "MS",
  MT = "MT",
  PA = "PA",
  PE = "PE",
  PR = "PR",
  RJ = "RJ",
  RM = "RM",
  RN = "RN",
  RO = "RO",
  RR = "RR",
  RS = "RS",
  SC = "SC",
  SE = "SE",
  SP = "SP",
  TO = "TO",
}

export class BrazilianStatesUtil {
  static parse(artType: string): BrazilianState | never {
    switch (artType) {
      case "AC":
        return BrazilianState.AC;
      case "AL":
        return BrazilianState.AL;
      case "AM":
        return BrazilianState.AM;
      case "AP":
        return BrazilianState.AP;
      case "BA":
        return BrazilianState.BA;
      case "CE":
        return BrazilianState.CE;
      case "DF":
        return BrazilianState.DF;
      case "ES":
        return BrazilianState.ES;
      case "GO":
        return BrazilianState.GO;
      case "MA":
        return BrazilianState.MA;
      case "MG":
        return BrazilianState.MG;
      case "MS":
        return BrazilianState.MS;
      case "MT":
        return BrazilianState.MT;
      case "PA":
        return BrazilianState.PA;
      case "PE":
        return BrazilianState.PE;
      case "PR":
        return BrazilianState.PR;
      case "RJ":
        return BrazilianState.RJ;
      case "RM":
        return BrazilianState.RM;
      case "RN":
        return BrazilianState.RN;
      case "RO":
        return BrazilianState.RO;
      case "RR":
        return BrazilianState.RR;
      case "RS":
        return BrazilianState.RS;
      case "SC":
        return BrazilianState.SC;
      case "SE":
        return BrazilianState.SE;
      case "SP":
        return BrazilianState.SP;
      case "TO":
        return BrazilianState.TO;

      default:
        return NotFoundEnumValueError.throw();
    }
  }

  static values(): BrazilianState[] {
    return [
      BrazilianState.AC,
      BrazilianState.AL,
      BrazilianState.AM,
      BrazilianState.AP,
      BrazilianState.BA,
      BrazilianState.CE,
      BrazilianState.DF,
      BrazilianState.ES,
      BrazilianState.GO,
      BrazilianState.MA,
      BrazilianState.MG,
      BrazilianState.MS,
      BrazilianState.MT,
      BrazilianState.PA,
      BrazilianState.PE,
      BrazilianState.PR,
      BrazilianState.RJ,
      BrazilianState.RM,
      BrazilianState.RN,
      BrazilianState.RO,
      BrazilianState.RR,
      BrazilianState.RS,
      BrazilianState.SC,
      BrazilianState.SE,
      BrazilianState.SP,
      BrazilianState.TO,
    ];
  }
}
