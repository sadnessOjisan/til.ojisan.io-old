import { isPost, isPostDTOS, isPosts, PostDTO, PostType } from "../entity/Post";
import { Fetch } from "../infra/fetch";
import { ApiResponseType } from "../type/util";

export const getPosts = async (): Promise<ApiResponseType<PostDTO[]>> => {
  const response = await Fetch(`api/posts`);
  if (response.status !== 200) {
    console.error("<getPosts> response:", response);
    return { data: undefined, error: "invalid status error" };
  }
  const data = await response.json();
  if (isPostDTOS(data)) {
    return { data: data, error: undefined };
  } else {
    console.error("<getPosts> invalid data struct: ", data);
    return { data: undefined, error: "invalid data struct" };
  }
};
