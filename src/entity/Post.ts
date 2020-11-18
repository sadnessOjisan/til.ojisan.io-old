import dayjs from "dayjs";
import marked from "marked";
import { TagType, isTags, isTagsDTO } from "./Tag";

export type PostIdType = string & { __postId: never };
export type PostIdsType = PostIdType[];
export type FormattedDateType = string & { __formattedDateString: never };
export type ValidDateType = string & { __validDateString: never };
export type HTMLContentType = string & { __htmlString: never };

export type PostType = {
  id: PostIdType;
  title: string;
  content: HTMLContentType;
  createdAt: ValidDateType;
  tags: TagType[];
};

/**
 * firestore からの取得
 * TODO: repositoryに定義
 */
export type PostDTO = Omit<PostType, "tags" | "createdAt"> & {
  tags: string[];
  createdAt: FirebaseFirestore.FieldValue;
};

export type PostViewType = PostType & {
  formattedCreatedDate: FormattedDateType;
};

export const isValidDate = (date: unknown): date is ValidDateType => {
  return dayjs(date as any).isValid();
};

export const isValidDates = (data: unknown): data is ValidDateType[] => {
  if (!Array.isArray(data)) return false;
  for (const d of data) {
    if (!isValidDate(d)) return false;
  }
  return true;
};

export const createValidDate = (date: Date): ValidDateType => {
  return dayjs(date).format() as ValidDateType;
};

export const createFormattedDate = (
  date: ValidDateType,
  isHour: boolean
): FormattedDateType => {
  return isHour
    ? (dayjs(date).format("YYYY年M月D日 hh時mm分") as FormattedDateType)
    : (dayjs(date).format("YYYY年M月D日") as FormattedDateType);
};

export const createURLFormattedDate = (
  date: ValidDateType
): FormattedDateType => {
  return dayjs(date).format("YYYY-MM-DD") as FormattedDateType;
};

export const createPostForView = (
  post: PostDTO,
  tags: TagType[],
  isHour: boolean
): PostViewType => {
  // @ts-ignore
  const createdAt = createValidDate(post.createdAt.toDate());
  const date = createFormattedDate(createdAt, false);
  return { ...post, createdAt, formattedCreatedDate: date, tags };
};

export type DocumentFieldData = Omit<PostType, "id">;

export type FormEditPostType = Omit<PostType, "createdAt">;

export type FormPostType = Omit<PostType, "id" | "createdAt">;

// DTO
export type SubmitPostType = {
  title: string;
  content: string;
  createdAt: FirebaseFirestore.FieldValue;
  tags: string[];
};

export type SubmitEditPostType = {
  title: string;
  content: string;
  tags: string[];
};

export const createHTMLString = (md: string): HTMLContentType => {
  return marked(md);
};

export const isPost = (data: any): data is PostType => {
  if (typeof data.id !== "string") return false;
  return isPostDTO(data);
};

/**
 * firestore から取得したdataが正当化チェック
 * @param data
 */
export const isPostDTO = (data: any): data is PostDTO => {
  if (typeof data.id !== "string") return false;
  if (typeof data.title !== "string") return false;
  if (typeof data.content !== "string") return false;
  if (!isValidDate(dayjs(data.createdAt.toDate()).format())) return false;
  if (!isStringArray(data.tags)) return false;
  return true;
};

export const isPostDTOS = (data: any): data is PostDTO[] => {
  if (!Array.isArray(data)) return false;
  for (const d of data) {
    if (!isPostDTO(d)) return false;
  }
  return true;
};

export const isStringArray = (data: any): data is string[] => {
  if (!Array.isArray(data)) return false;
  for (const d of data) {
    if (typeof d !== "string") return false;
  }
  return true;
};

export const isSubmitPostType = (data: any): data is FormPostType => {
  if (typeof data.title !== "string") return false;
  if (typeof data.content !== "string") return false;
  if (!isTags(data.tags)) return false;
  return true;
};

export const isSubmitEditPostType = (data: any): data is FormEditPostType => {
  if (typeof data.id !== "string") return false;
  if (typeof data.title !== "string") return false;
  if (typeof data.content !== "string") return false;
  if (!isTags(data.tags)) return false;
  return true;
};

export type DeletePostType = {
  id: string;
};

export const isDeletePostType = (body: any): body is DeletePostType => {
  return typeof body.id === "string";
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
