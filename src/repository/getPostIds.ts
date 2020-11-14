import { isIds, PostIdsType, PostType } from "../entity/Post";
import { Fetch } from "../infra/fetch";
import { ApiResponseType } from "../type/util";

export const getPostIds = async (): Promise<ApiResponseType<PostIdsType>> => {
  const response = await Fetch(`api/posts/ids`);
  if (response.status !== 200) {
    console.error("<getPostIds>invalid status");
    return { data: undefined, error: "invalid status error" };
  }
  const data = await response.json();
  if (isIds(data)) {
    return { data, error: undefined };
  } else {
    console.error("<getPostIds> invalid data struct");
    return { data: undefined, error: "invalid data struct" };
  }
};
