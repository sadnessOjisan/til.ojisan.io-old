import { store } from "../infra/FirebaseServer";
import { ApiResponseType, FireStoreDocument } from "../type/util";
import {
  isPostFirestoreDocument,
  isPostFirestoreField,
  PostFirestoreField,
} from "./dto/PostDTO";

export const getPostById = async (
  pid: string
): Promise<ApiResponseType<FireStoreDocument<PostFirestoreField>>> => {
  try {
    const snapshot = await store.collection("posts").doc(pid).get();
    const documentData = await snapshot.data();
    if (!isPostFirestoreField(documentData)) {
      console.error("<getPostById> invalid data struct: ", documentData);
      return { data: undefined, error: "invalid format data" };
    }
    const data = {
      id: snapshot.id,
      ...documentData,
    };
    if (!isPostFirestoreDocument(data)) {
      console.error("<getPostById> invalid data struct: ", data);
      return { data: undefined, error: "invalid format data" };
    }
    return { data: data, error: undefined };
  } catch (e) {
    console.error("<getPostById>", e);
    return { data: undefined, error: e };
  }
};
