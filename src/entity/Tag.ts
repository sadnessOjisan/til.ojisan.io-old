export type TagType = {
  name: string;
  backgroundColor: string;
  innerColor: string;
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

export const createTag = (name: string): TagType => {
  const backgroundColor = "red";
  const innerColor = "white";
  return { name, backgroundColor, innerColor };
};
