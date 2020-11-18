import { NextApiRequest, NextApiResponse } from "next";
import { COLLECTION } from "../../const/firestoreCollection";
import {
  isSubmitEditPostType,
  isSubmitPostType,
  SubmitEditPostType,
  SubmitPostType,
} from "../../entity/Post";
import { Admin, store } from "../../infra/FirebaseServer";

/**
 * 編集成功: 204
 */
export default async (req: NextApiRequest, response: NextApiResponse) => {
  const { headers } = req;
  const idToken = headers.authorization;
  const decodedToken = await Admin.auth().verifyIdToken(idToken);
  const { uid } = decodedToken;
  if (uid !== process.env.ADMIN_USER_ID) {
    response.status(404);
    response.json({ error: "invalid user token" });
  }
  const { body } = req;
  if (!isSubmitEditPostType(body)) {
    console.error("invalid body: ", body);
    throw new Error("invalid request");
  }

  const createdTagIds: string[] = [];
  let promises: Promise<void>[];
  // tag の保存
  try {
    promises = body.tags.map(async (tag) => {
      // 既存 tag が無い時だけ作成する
      const tagName = tag.name;
      const snapshot = await store
        .collection("tags")
        .where("name", "==", tagName)
        .get();
      if (snapshot.empty) {
        const createdTagRef = await store.collection(COLLECTION.TAGS).add(tag);
        const id = createdTagRef.id;
        createdTagIds.push(id);
      } else {
        const ids = snapshot.docs.map((d) => d.id);
        if (ids.length !== 1) {
          throw new Error("invalid data");
        }
        const id = ids[0];
        createdTagIds.push(id);
      }
    });
  } catch (e) {
    response.status(500);
    response.json({ error: e });
    return;
  }
  Promise.all(promises).then(async () => {
    const postBody: SubmitEditPostType = {
      title: body.title,
      content: body.content,
      tags: createdTagIds,
    };

    // post の編集保存
    try {
      await store.collection(COLLECTION.POSTS).doc(body.id).update(postBody);
      response.status(204);
    } catch (e) {
      response.status(500);
      response.json({ error: e });
    }
  });
};
