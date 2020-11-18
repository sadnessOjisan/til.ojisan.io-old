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

export const createTag = (name: string): TagType => {
  const isWhite = Math.random() < 0.5;
  let backgroundColor: HexColorType, innerColor: HexColorType;
  if (isWhite) {
    backgroundColor =
      bgWithWhite[Math.floor(Math.random() * bgWithWhite.length)];
    innerColor = "#fffffe" as HexColorType;
  } else {
    backgroundColor =
      bgWithBlack[Math.floor(Math.random() * bgWithBlack.length)];
    innerColor = "#271c19" as HexColorType;
  }

  return { name, backgroundColor, innerColor };
};

const bgWithWhite = [
  "#ff8906",
  "#232946",
  "#6246ea",
  "#9656a1",
  "#5d55a1",
  "#8c7851",
  "#00473e",
  "#e53170",
] as HexColorType[];

const bgWithBlack = [
  "#eebbc3",
  "#ffd803",
  "#ff8e3c",
  "#eff0f3",
  "#ff6e6c",
  "#ffc0ad",
  "c3ffad",
] as HexColorType[];
