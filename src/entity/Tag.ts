// TODO: as HexColorType をmapを使ってtoHexみたいなのに置き換える

import { TagType } from "../type/model/Tag";
import { HexColorType, isHexColorType } from "../type/util";

export type SubmitTagType = TagType & {
  createdAt: string;
};

export const isTag = (data: any): data is TagType => {
  if (typeof data.name !== "string") return false;
  if (typeof data.backgroundColor !== "string") return false;
  if (typeof data.innerColor !== "string") return false;
  return true;
};

export const isTags = (data: any): data is TagType[] => {
  if (!Array.isArray(data)) return false;
  for (const d of data) {
    if (!isTag(d)) return false;
  }
  return true;
};

export const isTagDTO = (data: any): data is TagType => {
  if (typeof data.name !== "string") return false;
  if (typeof data.backgroundColor !== "string") return false;
  if (typeof data.innerColor !== "string") return false;
  return true;
};

export const isTagsDTO = (data: any): data is TagType[] => {
  if (!Array.isArray(data)) return false;
  for (const d of data) {
    if (!isTagDTO(d)) return false;
  }
  return true;
};
