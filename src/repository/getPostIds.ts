import { isIds, PostIdsType, PostType } from "../entity/Post";
import { store } from "../infra/FirebaseServer";
import { Fetch } from "../infra/fetch";
import { ApiResponseType } from "../type/util";

export const getPostIds = async (): Promise<ApiResponseType<PostIdsType>> => {
  try {
    const documents = await store.collection("posts").get();
    const postIds = documents.docs.map((d) => {
      return d.id;
    });
    if (!isIds(postIds)) {
      console.error("<getPostIds> invalid data struct: ", postIds);
      return { data: undefined, error: "invalid data struct" };
    }
    return { data: postIds, error: undefined };
  } catch (e) {
    return { data: undefined, error: e };
  }
};
