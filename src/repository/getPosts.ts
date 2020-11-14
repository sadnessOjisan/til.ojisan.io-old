import { isPost, isPosts, PostType } from "../entity/Post";
import { Fetch } from "../infra/fetch";
import { ApiResponseType } from "../type/util";

export const getPosts = async (): Promise<ApiResponseType<PostType[]>> => {
  const response = await Fetch(`api/posts`);
  if (response.status !== 200) {
    console.log("<getPosts> response:", response);
    return { data: undefined, error: "invalid status error" };
  }
  const data = await response.json();
  if (isPosts(data)) {
    return { data, error: undefined };
  } else {
    console.log("<getPosts> invalid data struct: ", data);
    return { data: undefined, error: "invalid data struct" };
  }
};
