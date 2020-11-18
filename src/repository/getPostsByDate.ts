import dayjs from "dayjs";
import { store } from "../infra/FirebaseServer";
import { ApiResponseType, ValidDateType } from "../type/util";
import {
  arePostsFirestoreDocument,
  PostFirestoreDocument,
} from "./dto/PostDTO";

/**
 * 渡された日付のとある1日分の投稿を全件取得する。
 * @param date
 */
export const getPostsByDate = async (
  date: ValidDateType
): Promise<ApiResponseType<PostFirestoreDocument[]>> => {
  try {
    const documents = await store
      .collection("posts")
      .orderBy("createdAt", "asc")
      .startAt(
        dayjs(date).set("hour", 0).set("minute", 0).set("second", 0).toDate()
      )
      .endBefore(
        dayjs(date).set("hour", 23).set("minute", 59).set("second", 59).toDate()
      )
      .get();
    const data = documents.docs.map((d) => {
      return { id: d.id, ...d.data() };
    });

    if (!arePostsFirestoreDocument(data)) {
      console.error("<getPostsByDate> invalid data struct: ", data);
      return { data: undefined, error: "invalid data struct" };
    }
    return { data: data, error: undefined };
  } catch (e) {
    console.error("<getPostsByDate> error: ", e);
    return { data: undefined, error: e };
  }
};
