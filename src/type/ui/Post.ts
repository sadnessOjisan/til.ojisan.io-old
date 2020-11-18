import { PostType } from "../model/Post";
import { ValidDateType } from "../util";

export type FormEditPostType = Omit<PostType, "createdAt">;

export type PostViewType = PostType & {
  formattedCreatedDate: ValidDateType;
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
