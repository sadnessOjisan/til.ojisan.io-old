import marked from "marked";
import { TagType } from "../../entity/Tag";
import { ValidDateType } from "../util";

export type PostIdType = string & { __postId: never };
export type PostIdsType = PostIdType[];

export const toPostId = (data: any): data is PostIdType => {
  return typeof data === "string";
};

export type HTMLContentType = string & { __htmlString: never };

export const toHTMLContentType = (data: any): data is HTMLContentType => {
  return marked(data);
};

export type MdContentType = string & { __mdString: never };

export type ContentStringType = HTMLContentType & MdContentType;

export type PostType = {
  id: PostIdType;
  title: string;
  content: ContentStringType;
  createdAt: ValidDateType;
  tags: TagType[];
};
