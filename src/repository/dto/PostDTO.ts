/**
 * @file firestore の post コレクションへのアクセス型を定義するファイル
 */

import { HTMLContentType, MdContentType } from "../../type/model/Post";
import { TagType } from "../../type/model/Tag";
import { FireStoreDocument, isStringArray } from "../../type/util";

export type PostFirestoreField = {
  title: string;
  content: string;
  // Firestoreを使う以上はタイムスタンプ型を使わないといけない。
  createdAt: FirebaseFirestore.FieldValue;
  // tagIdの配列
  tags: string[];
};

export const isPostFirestoreField = (data: any): data is PostFirestoreField => {
  if (typeof data.title !== "string") return false;
  if (typeof data.content !== "string") return false;
  try {
    data.createdAt.toDate();
  } catch (e) {
    return false;
  }
  if (!isStringArray(data.tags)) return false;
  return true;
};

export const arePostsFirestoreField = (
  data: any
): data is PostFirestoreField[] => {
  if (!Array.isArray(data)) return false;
  for (let d of data) isPostFirestoreField(d);
  return true;
};

/**
 * document は id も付く
 */
export type PostFirestoreDocument = FireStoreDocument<PostFirestoreField>;

export const isPostFirestoreDocument = (
  data: any
): data is PostFirestoreDocument => {
  isPostFirestoreField(data);
  if (typeof data.id !== "string") return false;
  return true;
};

export const arePostsFirestoreDocument = (
  data: any
): data is PostFirestoreDocument[] => {
  if (!Array.isArray(data)) return false;
  for (let d of data) isPostFirestoreDocument(d);
  return true;
};

export type DeletePostType = {
  id: string;
};

export const isDeletePostType = (body: any): body is DeletePostType => {
  return typeof body.id === "string";
};

export type FormPostType = {
  title: string;
  content: HTMLContentType;
  tags: TagType[];
};

export type EditFormPostType = {
  id: string;
  title: string;
  content: HTMLContentType;
  tags: TagType[];
};

export const isSubmitPostType = (data: any): data is FormPostType => {
  if (typeof data.title !== "string") return false;
  if (typeof data.content !== "string") return false;
  if (!isStringArray(data.tags)) return false;
  return true;
};

export const isSubmitEditPostType = (data: any): data is EditFormPostType => {
  if (typeof data.id !== "string") return false;
  isSubmitPostType(data);
  return true;
};
