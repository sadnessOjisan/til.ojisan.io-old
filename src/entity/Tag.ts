export type TagType = {
  name: string;
  backgroundColor: string;
  innerColor: string;
};

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

export const createTag = (name: string): TagType => {
  const isWhite = Math.random() < 0.5;
  let backgroundColor, innerColor;
  if (isWhite) {
    backgroundColor =
      bgWithWhite[Math.floor(Math.random() * bgWithWhite.length)];
    innerColor = "#fffffe";
  } else {
    backgroundColor =
      bgWithBlack[Math.floor(Math.random() * bgWithBlack.length)];
    innerColor = "#271c19";
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
];

const bgWithBlack = [
  "#eebbc3",
  "#ffd803",
  "#ff8e3c",
  "#eff0f3",
  "#ff6e6c",
  "#ffc0ad",
  "c3ffad",
];
