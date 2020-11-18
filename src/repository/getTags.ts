import { FieldPath, store } from "../infra/FirebaseServer";
import { ApiResponseType } from "../type/util";
import { areTagsFirestoreDocument, TagsFirestoreDocument } from "./dto/TagDTO";

export const getTags = async (
  ids: string[]
  // たまたま dto と tagtype が一致しているからこう書いてる
): Promise<ApiResponseType<TagsFirestoreDocument>> => {
  try {
    const documents = await store
      .collection("tags")
      .where(FieldPath.documentId(), "in", ids)
      .get();
    const tags = documents.docs.map((d) => {
      return { id: d.id, ...d.data() };
    });
    if (!areTagsFirestoreDocument(tags)) {
      console.error("<getTags> invalid data struct: ", tags);
      return { data: undefined, error: "invalid format data" };
    }
    return { data: tags, error: undefined };
  } catch (e) {
    return { data: undefined, error: e };
  }
};
