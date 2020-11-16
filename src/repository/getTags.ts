import { TagType } from "../entity/Tag";
import { Fetch } from "../infra/fetch";
import { ApiResponseType } from "../type/util";

export const getTags = async (
  ids: string[]
): Promise<ApiResponseType<TagType[]>> => {
  const queryStrings = JSON.stringify(ids);
  const response = await Fetch(`api/tags/getByIds?ids=${queryStrings}`);
  if (response.status !== 200) {
    return { data: undefined, error: "invalid status error" };
  }
  const data = await response.json();
  return { data, error: undefined };
};
