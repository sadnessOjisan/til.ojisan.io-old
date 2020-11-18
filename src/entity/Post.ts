import dayjs from "dayjs";
import marked from "marked";
import {
  isValidDate,
  toFormattedJapaneseDateType,
  ValidDateType,
} from "../type/util";
import { TagType, isTags, isTagsDTO } from "./Tag";

/**
 * firestore からの取得
 * TODO: repositoryに定義
 */
type PostDTO = Omit<PostType, "tags" | "createdAt"> & {
  tags: string[];
  createdAt: FirebaseFirestore.FieldValue;
};

const isValidDates = (data: unknown): data is ValidDateType[] => {
  if (!Array.isArray(data)) return false;
  for (const d of data) {
    if (!isValidDate(d)) return false;
  }
  return true;
};

const createValidDate = (date: Date): ValidDateType => {
  return dayjs(date).format() as ValidDateType;
};

const createPostForView = (
  post: PostDTO,
  tags: TagType[],
  isHour: boolean
): PostViewType => {
  // @ts-ignore
  const createdAt = createValidDate(post.createdAt.toDate());
  const date = toFormattedJapaneseDateType(createdAt);
  return { ...post, createdAt, formattedCreatedDate: date, tags };
};

const isPost = (data: any): data is PostType => {
  if (typeof data.id !== "string") return false;
  return isPostDTO(data);
};

/**
 * firestore から取得したdataが正当化チェック
 * @param data
 */
const isPostDTO = (data: any): data is PostDTO => {
  console.log("data.createdAt", data.createdAt);
  if (typeof data.id !== "string") return false;
  if (typeof data.title !== "string") return false;
  if (typeof data.content !== "string") return false;
  if (!isValidDate(dayjs(data.createdAt.toDate()).format())) return false;
  if (!isStringArray(data.tags)) return false;
  return true;
};

const isPostDTOS = (data: any): data is PostDTO[] => {
  if (!Array.isArray(data)) return false;
  for (const d of data) {
    if (!isPostDTO(d)) return false;
  }
  return true;
};

const isSubmitPostType = (data: any): data is FormPostType => {
  if (typeof data.title !== "string") return false;
  if (typeof data.content !== "string") return false;
  if (!isTags(data.tags)) return false;
  return true;
};

const isSubmitEditPostType = (data: any): data is FormEditPostType => {
  if (typeof data.id !== "string") return false;
  if (typeof data.title !== "string") return false;
  if (typeof data.content !== "string") return false;
  if (!isTags(data.tags)) return false;
  return true;
};

const isPosts = (data: any): data is PostType[] => {
  if (!Array.isArray(data)) return false;
  for (const d of data) {
    if (!isPost(d)) return false;
  }
  return true;
};

const isId = (data: any): data is PostIdType => {
  if (typeof data !== "string") return false;
  return true;
};

const isIds = (data: any): data is PostIdType[] => {
  if (!Array.isArray(data)) return false;
  for (const d of data) {
    if (!isId(d)) return false;
  }
  return true;
};
