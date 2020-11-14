export type PostIdType = string & { __postId: never };
export type PostIdsType = PostIdType[];
export type ISOStringType = string & { __isoString: never };

export const createISOString = (date: string): ISOStringType => {
  return "" as ISOStringType;
};

export type PostType = {
  id: PostIdType;
  title: string;
  content: string;
  createdDate: ISOStringType;
};

export type SubmitPostType = Omit<PostType, "id">;

export const isPost = (data: any): data is PostType => {
  if (typeof data.id !== "string") return false;
  if (typeof data.title !== "string") return false;
  if (typeof data.content !== "string") return false;
  if (typeof data.createdDate !== "string") return false;
  return true;
};

export const isSubmitPostType = (data: any): data is SubmitPostType => {
  if (typeof data.title !== "string") return false;
  if (typeof data.content !== "string") return false;
  return true;
};

export const isPosts = (data: any): data is PostType[] => {
  if (!Array.isArray(data)) return false;
  for (const d of data) {
    if (!isPost(d)) return false;
  }
  return true;
};

export const isId = (data: any): data is PostIdType => {
  if (typeof data !== "string") return false;
  return true;
};

export const isIds = (data: any): data is PostIdType[] => {
  if (!Array.isArray(data)) return false;
  for (const d of data) {
    if (!isId(d)) return false;
  }
  return true;
};
