import { isStringArray } from "../entity/Post";
import { store } from "../infra/FirebaseServer";
import { ApiResponseType } from "../type/util";

export const getAllTags = async (): Promise<ApiResponseType<string[]>> => {
  try {
    const documents = await store.collection("tags").get();
    const tags = documents.docs.map((d) => {
      return d.data().name;
    });
    if (!isStringArray(tags)) {
      console.error("<getPostAllDates> invalid data struct: ", tags);
      return { data: undefined, error: "invalid data struct" };
    }
    return { data: tags, error: undefined };
  } catch (e) {
    return { data: undefined, error: e };
  }
};
