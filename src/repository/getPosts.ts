import { isPostDTOS, PostDTO } from "../entity/Post";
import { store } from "../infra/FirebaseServer";
import { ApiResponseType } from "../type/util";

export const getPosts = async (): Promise<ApiResponseType<PostDTO[]>> => {
  try {
    const documents = await store.collection("posts").get();
    const posts = documents.docs.map((d) => {
      const post = {
        id: d.id,
        ...d.data(),
      };
      return post;
    });
    if (!isPostDTOS(posts)) {
      console.error("<getPosts> invalid data struct: ", posts);
      return { data: undefined, error: "invalid data struct" };
    }
    return { data: posts, error: undefined };
  } catch (e) {
    return { data: undefined, error: e };
  }
};
