import { isPost, PostDTO, PostType } from "../entity/Post";
import { Fetch } from "../infra/fetch";
import { ApiResponseType } from "../type/util";

export const getPostById = async (
  pid: string
): Promise<ApiResponseType<PostDTO>> => {
  const response = await Fetch(`api/posts/${pid}`);
  if (response.status !== 200) {
    console.error("<getPostById> response:", response);
    return { data: undefined, error: "invalid status error" };
  }
  const data = await response.json();
  return { data, error: undefined };
};
