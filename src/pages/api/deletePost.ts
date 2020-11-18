import { NextApiRequest, NextApiResponse } from "next";
import { COLLECTION } from "../../const/firestoreCollection";
import { Admin, store } from "../../infra/FirebaseServer";
import { isDeletePostType } from "../../repository/dto/PostDTO";

/**
 * 削除成功: 204
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
  if (!isDeletePostType(body)) {
    console.error("<deletePost> invalid body: ", body);
    throw new Error("invalid request");
  }

  try {
    await store.collection(COLLECTION.POSTS).doc(body.id).delete();
    response.status(204);
    response.json({});
  } catch (e) {
    response.status(500);
    response.json({ error: e });
    return;
  }
};
