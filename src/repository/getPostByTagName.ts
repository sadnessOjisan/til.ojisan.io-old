import { isPostDTOS, PostDTO } from "../entity/Post";
import { store } from "../infra/FirebaseServer";
import { ApiResponseType } from "../type/util";

export const getPostByTagName = async (
  tagName: string
): Promise<ApiResponseType<PostDTO[]>> => {
  let tagId: string;
  try {
    const documents = await store
      .collection("tags")
      .where("name", "==", tagName)
      .get();

    const docs = documents.docs;
    if (docs.length !== 1) {
      throw new Error("duplicated data");
    }
    const doc = docs[0];
    tagId = doc.id;
  } catch (e) {
    console.error("<getPostsByDate> error: ", e);
    return { data: undefined, error: e };
  }

  try {
    const documents = await store
      .collection("posts")
      .where("tags", "in", tagId)
      .get();

    const data = documents.docs.map((d) => {
      return { id: d.id, ...d.data() };
    });
    if (!isPostDTOS(data)) {
      console.error("<getPostsByDate> invalid data struct: ", data);
      return { data: undefined, error: "invalid data struct" };
    }
    return { data: data, error: undefined };
  } catch (e) {
    console.error("<getPostsByDate> error: ", e);
    return { data: undefined, error: e };
  }
};
