import { FireStoreDocument } from "../../type/util";

export type TagFirestoreField = {
  name: string;
  backgroundColor: string;
  innerColor: string;
};

export type TagFirestoreDocument = FireStoreDocument<TagFirestoreField>;
export type TagsFirestoreDocument = TagFirestoreDocument[];

export const isTagFirestoreField = (data: any): data is TagFirestoreField => {
  if (typeof data.name !== "string") return false;
  if (typeof data.backgroundColor !== "string") return false;
  if (typeof data.innerColor !== "string") return false;
  return true;
};

export const isTagFirestoreDocument = (
  data: any
): data is TagFirestoreDocument => {
  if (typeof data.id !== "string") return false;
  isTagFirestoreField(data);
  return true;
};

export const areTagsFirestoreField = (
  data: any
): data is TagFirestoreField[] => {
  if (!Array.isArray(data)) return false;
  for (let d of data) isTagFirestoreField(d);
  return true;
};

export const areTagsFirestoreDocument = (
  data: any
): data is TagFirestoreDocument[] => {
  if (!Array.isArray(data)) return false;
  for (let d of data) isTagFirestoreDocument(d);
  return true;
};
