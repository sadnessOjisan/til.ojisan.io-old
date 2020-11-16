import { isTagsDTO, TagType } from "../entity/Tag";
import { FieldPath, store } from "../infra/FirebaseServer";
import { ApiResponseType } from "../type/util";

export const getTags = async (
  ids: string[]
  // たまたま dto と tagtype が一致しているからこう書いてる
): Promise<ApiResponseType<TagType[]>> => {
  try {
    const documents = await store
      .collection("tags")
      .where(FieldPath.documentId(), "in", ids)
      .get();
    const tags = documents.docs.map((d) => {
      return d.data();
    });
    if (!isTagsDTO(tags)) {
      console.error("<getTags> invalid data struct: ", tags);
      return { data: undefined, error: "invalid format data" };
    }
    return { data: tags, error: undefined };
  } catch (e) {
    return { data: undefined, error: e };
  }
};
