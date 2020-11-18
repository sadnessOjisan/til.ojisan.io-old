import { store } from "../infra/FirebaseServer";
import { Fetch } from "../infra/fetch";
import { ApiResponseType, isStringArray } from "../type/util";
import { PostIdsType } from "../type/model/Post";

export const getPostIds = async (): Promise<ApiResponseType<string[]>> => {
  try {
    const documents = await store.collection("posts").get();
    const postIds = documents.docs.map((d) => {
      return d.id;
    });
    if (!isStringArray(postIds)) {
      console.error("<getPostIds> invalid data struct: ", postIds);
      return { data: undefined, error: "invalid data struct" };
    }
    return { data: postIds, error: undefined };
  } catch (e) {
    return { data: undefined, error: e };
  }
};
