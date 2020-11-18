import { HexColorType, isHexColorType } from "../util";

export type TagType = {
  name: string;
  backgroundColor: HexColorType;
  innerColor: HexColorType;
};

type InputTag = {
  id: string;
  name: string;
  backgroundColor: string;
  innerColor: string;
};

export const toTag = (tag: InputTag) => {
  if (!isHexColorType(tag.backgroundColor) || !isHexColorType(tag.innerColor)) {
    throw new Error("invalid data format");
  }
  return {
    name: tag.name,
    backgroundColor: tag.backgroundColor,
    innerColor: tag.innerColor,
  };
};

export const toTags = (tags: InputTag[]): TagType[] => {
  return tags.map((tag) => toTag(tag));
};
