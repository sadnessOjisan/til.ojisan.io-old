import { isPost, PostType } from "../entity/Post";
import { Fetch } from "../infra/fetch";
import { ApiResponseType } from "../type/util";

export const getPostById = async (
  pid: string
): Promise<ApiResponseType<PostType>> => {
  const response = await Fetch(`api/posts/${pid}`);
  if (response.status !== 200) {
    console.log("response:", response);
    return { data: undefined, error: "invalid status error" };
  }
  const data = await response.json();
  if (isPost(data)) {
    return { data, error: undefined };
  } else {
    return { data: undefined, error: "invalid data struct" };
  }
};
