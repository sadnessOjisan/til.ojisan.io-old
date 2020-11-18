import { store } from "../infra/FirebaseServer";
import { ApiResponseType } from "../type/util";
import {
  arePostsFirestoreDocument,
  PostFirestoreDocument,
} from "./dto/PostDTO";

export const getPosts = async (): Promise<
  ApiResponseType<PostFirestoreDocument[]>
> => {
  try {
    const snapshot = await store.collection("posts").get();
    const posts = snapshot.docs.map((d) => {
      const post = {
        id: d.id,
        ...d.data(),
      };
      return post;
    });
    if (!arePostsFirestoreDocument(posts)) {
      console.error("<getPosts> invalid data struct: ", posts);
      return { data: undefined, error: "invalid data struct" };
    }
    return { data: posts, error: undefined };
  } catch (e) {
    console.error("<getPosts>", e);
    return { data: undefined, error: e };
  }
};
