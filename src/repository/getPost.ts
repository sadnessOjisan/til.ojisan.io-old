import { isPost } from "../entity/Post";
import { Fetch } from "../infra/fetch";

export const getPostById = async (pid: string) => {
  const response = await Fetch(`api/posts/${pid}`);
  if (response.status !== 200) {
    console.log("response:", response);
    return { error: "invalid status error" };
  }
  const data = await response.json();
  if (isPost(data)) {
    return { data };
  } else {
    return { error: "invalid data struct" };
  }
};
