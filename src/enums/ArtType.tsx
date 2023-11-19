import { NotFoundEnumValueError } from "../errors/NotFoundEnumValueError";

export enum ArtType {
  dance = "dança",
  sculpture = "escultura",
  music = "música",
  painting = "pintura",
  theater = "teatro",
}

export class ArtTypesUtil {
  static parse(artType: string): ArtType | never {
    switch (artType) {
      case "dança":
        return ArtType.dance;
      case "escultura":
        return ArtType.sculpture;
      case "música":
        return ArtType.music;
      case "pintura":
        return ArtType.painting;
      case "teatro":
        return ArtType.theater;
      default:
        return NotFoundEnumValueError.throw();
    }
  }

  static values(): ArtType[] {
    return [
      ArtType.dance,
      ArtType.sculpture,
      ArtType.music,
      ArtType.painting,
      ArtType.theater,
    ];
  }
}
