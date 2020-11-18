import marked from "marked";
import { ValidDateType } from "../util";
import { TagType } from "./Tag";

export type PostIdType = string & { __postId: never };
export type PostIdsType = PostIdType[];

export const toPostId = (id: string) => {
  return id as PostIdType;
};

export type HTMLContentType = string & { __htmlString: never };

export const toHTMLContentType = (data: any) => {
  return marked(data) as HTMLContentType;
};

export type MdContentType = string & { __mdString: never };

export type ContentStringType = HTMLContentType | MdContentType;

export type PostType = {
  id: PostIdType;
  title: string;
  content: ContentStringType;
  createdAt: ValidDateType;
  tags: TagType[];
};
