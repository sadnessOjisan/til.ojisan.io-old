import { PostFirestoreDocument } from "../../repository/dto/PostDTO";
import { TagsFirestoreDocument } from "../../repository/dto/TagDTO";
import { PostType, toHTMLContentType, toPostId } from "../model/Post";
import { toTags } from "../model/Tag";
import {
  FormattedJapaneseDateTimeType,
  FormattedJapaneseDateType,
  toFormattedJapaneseDateTimeType,
  toFormattedJapaneseDateType,
  ValidDateType,
} from "../util";

export type FormEditPostType = Omit<PostType, "createdAt">;

export type PostViewType = PostType & {
  formattedCreatedDate: ValidDateType;
};

export type PostIndexPagePostType = Omit<PostType, "createdAt"> & {
  createdAt: FormattedJapaneseDateType;
};

export type PostDetailPagePostType = Omit<PostType, "createdAt"> & {
  createdAt: FormattedJapaneseDateTimeType;
};

export const toPostIndexPagePostType = (
  post: PostFirestoreDocument,
  tags: TagsFirestoreDocument
): PostIndexPagePostType => {
  const postId = toPostId(post.id);
  const createdAt = post.createdAt.toDate();
  const date = toFormattedJapaneseDateType(createdAt);
  const htmlContent = toHTMLContentType(post.content);

  const validTags = toTags(tags);
  return {
    id: postId,
    title: post.title,
    content: htmlContent,
    createdAt: date,
    tags: validTags,
  };
};

export const toPostDetailPagePostType = (
  post: PostFirestoreDocument,
  tags: TagsFirestoreDocument
): PostDetailPagePostType => {
  const postId = toPostId(post.id);
  const createdAt = post.createdAt.toDate();
  const date = toFormattedJapaneseDateTimeType(createdAt);
  const htmlContent = toHTMLContentType(post.content);

  const validTags = toTags(tags);
  return {
    id: postId,
    title: post.title,
    content: htmlContent,
    createdAt: date,
    tags: validTags,
  };
};

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
