import { isPostDTO, PostDTO } from "../entity/Post";
import { store } from "../infra/FirebaseServer";
import { ApiResponseType } from "../type/util";

export const getPostById = async (
  pid: string
): Promise<ApiResponseType<PostDTO>> => {
  try {
    const snapshot = await store.collection("posts").doc(pid).get();
    const data = await snapshot.data();
    if (!isPostDTO(data)) {
      console.error("<getPostById> invalid data struct: ", data);
      return { data: undefined, error: "invalid format data" };
    }
    return { data, error: undefined };
  } catch (e) {
    return { data: undefined, error: e };
  }
};
