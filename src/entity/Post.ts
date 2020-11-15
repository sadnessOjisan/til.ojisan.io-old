import dayjs from "dayjs";
import marked from "marked";
import { TagType, isTags } from "./Tag";

export type PostIdType = string & { __postId: never };
export type PostIdsType = PostIdType[];
export type ISOStringType = string & { __isoString: never };
export type FormattedDateType = string & { __formattedDateString: never };
export type HTMLContentType = string & { __htmlString: never };

export type PostType = {
  id: PostIdType;
  title: string;
  content: HTMLContentType;
  createdAt: ISOStringType;
  tags: TagType[];
};

export type PostViewType = Omit<PostType, "createdAt"> & {
  createdAt: FormattedDateType;
};

const isValidDate = (date: string) => {
  return dayjs(date).isValid();
};

const createFormattedDate = (
  date: string,
  isHour: boolean
): FormattedDateType => {
  if (!isValidDate) throw new Error("invalid date");
  return isHour
    ? (dayjs(date).format("YYYY年M月D日 hh時mm分") as FormattedDateType)
    : (dayjs(date).format("YYYY年M月D日") as FormattedDateType);
};

export const createPostForView = (
  post: PostType,
  isHour: boolean
): PostViewType => {
  const formattedDate = createFormattedDate(post.createdAt, isHour);
  return { ...post, createdAt: formattedDate };
};

export type DocumentFieldData = Omit<PostType, "id">;
export type SubmitPostType = Omit<PostType, "id" | "createdAt">;

export const createHTMLString = (md: string): HTMLContentType => {
  return marked(md);
};

export const isPost = (data: any): data is PostType => {
  if (typeof data.id !== "string") return false;
  return isPostDocumentFieldData(data);
};

export const isPostDocumentFieldData = (
  data: any
): data is DocumentFieldData => {
  if (typeof data.title !== "string") return false;
  if (typeof data.content !== "string") return false;
  if (!isValidDate(data.createdAt)) return false;
  if (!isTags(data.tags)) return false;
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
