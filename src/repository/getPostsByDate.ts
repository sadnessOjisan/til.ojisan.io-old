import dayjs from "dayjs";
import { isPostDTOS, PostDTO, ValidDateType } from "../entity/Post";
import { store } from "../infra/FirebaseServer";
import { ApiResponseType } from "../type/util";

export const getPostsByDate = async (
  date: ValidDateType
): Promise<ApiResponseType<PostDTO[]>> => {
  try {
    const documents = await store
      .collection("posts")
      .orderBy("createdAt", "asc")
      .startAt(
        dayjs(date).set("hour", 0).set("minute", 0).set("second", 0).toDate()
      )
      .endBefore(
        dayjs(date).set("hour", 23).set("minute", 59).set("second", 59).toDate()
      )
      .get();
    const data = documents.docs.map((d) => {
      return { id: d.id, ...d.data() };
    });

    if (!isPostDTOS(data)) {
      console.error("<getPostsByDate> invalid data struct: ", data);
      return { data: undefined, error: "invalid data struct" };
    }
    return { data: data, error: undefined };
  } catch (e) {
    console.error("<getPostsByDate> error: ", e);
    return { data: undefined, error: e };
  }
};
