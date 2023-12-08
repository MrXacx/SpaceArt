import { NotFoundEnumValueError } from "../errors/NotFoundEnumValueError";

export enum ArtType {
  dance = "dance",
  sculpture = "sculpture",
  music = "music",
  painting = "painting",
  acting = "acting",
}

export class ArtTypesUtil {
  static parse(artType: string): ArtType | never {
    switch (artType) {
      case "dance":
        return ArtType.dance;
      case "sculpture":
        return ArtType.sculpture;
      case "music":
        return ArtType.music;
      case "painting":
        return ArtType.painting;
      case "acting":
        return ArtType.acting;
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
