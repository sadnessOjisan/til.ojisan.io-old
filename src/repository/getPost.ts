import { isPost } from "../entity/Post";

export const getPostById = async (pid: string) => {
  const response = await fetch(`/api/getPost/${pid}`);
  if (response.status !== 200) {
    return { error: "invalid status error" };
  }
  const data = await response.json();
  if (isPost(data)) {
    return { data };
  } else {
    return { error: "invalid data struct" };
  }
};
