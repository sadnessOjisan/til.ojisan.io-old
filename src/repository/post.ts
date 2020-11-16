import dayjs from "dayjs";
import { FormPostType, isSubmitPostType, SubmitPostType } from "../entity/Post";
import { Admin, store } from "../infra/FirebaseServer";

export const postTil = async (body: FormPostType, token: string) => {
  const decodedToken = await Admin.auth().verifyIdToken(token);
  const { uid } = decodedToken;
  if (uid !== process.env.ADMIN_USER_ID) {
    throw new Error("invalid user");
  }
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
      const query = await store
        .collection("tags")
        .where("name", "==", tagName)
        .get();
      if (query.empty) {
        const createdTagRef = await store.collection("tags").add(tag);
        const id = createdTagRef.id;
        createdTagIds.push(id);
      }
    });
  } catch (e) {
    console.error(e);
    return;
  }
  Promise.all(promises).then(async () => {
    const postBody: SubmitPostType = {
      title: body.title,
      content: body.content,
      createdAt: dayjs().format(),
      tags: createdTagIds,
    };

    // post の保存
    try {
      await store.collection("posts").add(postBody);
    } catch (e) {
      console.error(e);
      return;
    }
  });
};
