import { NextApiRequest, NextApiResponse } from "next";
import { Admin, store } from "../../infra/FirebaseServer";
import {
  isSubmitPostType,
  PostFirestoreField,
} from "../../repository/dto/PostDTO";

/**
 * 作成成功: 204
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
  // HACK: server サイドなのでバリデーションいる
  if (!isSubmitPostType(body)) {
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
        const createdTagRef = await store.collection("tags").add(tag);
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
    const postBody: PostFirestoreField = {
      title: body.title,
      content: body.content,
      createdAt: Admin.firestore.FieldValue.serverTimestamp(),
      tags: createdTagIds,
    };

    // post の保存
    try {
      await store.collection("posts").add(postBody);
      response.status(204);
      response.json({});
    } catch (e) {
      response.status(500);
      response.json({ error: e });
    }
  });
};
