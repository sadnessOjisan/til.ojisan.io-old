import { isPost, PostType } from "../entity/Post";
import { Fetch } from "../infra/fetch";
import { ApiResponseType } from "../type/util";

export const postTil = async (
  title: string,
  content: string,
  token: string
): Promise<ApiResponseType<PostType>> => {
  const response = await Fetch(`api/postTil`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify({ title, content }),
  });
  if (response.status !== 200) {
    console.log("<postTil> response:", response);
    return { data: undefined, error: "invalid status error" };
  }
  const data = await response.json();
  if (isPost(data)) {
    return { data, error: undefined };
  } else {
    return { data: undefined, error: "invalid data struct" };
  }
};
