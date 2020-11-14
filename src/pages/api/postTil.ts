import * as admin from "firebase-admin";
import { NextApiRequest, NextApiResponse } from "next";
import {
  ISOStringType,
  isSubmitPostType,
  PostType,
  SubmitPostType,
} from "../../entity/Post";
import { Admin, store } from "../../infra/FirebaseServer";

export default async (req: NextApiRequest, response: NextApiResponse) => {
  const { headers } = req;
  const idToken = headers.authorization;
  const decodedToken = await admin.auth().verifyIdToken(idToken);
  const { uid } = decodedToken;
  if (uid !== process.env.ADMIN_USER_ID) {
    response.status(404);
    response.json({ error: "invalid user token" });
  }
  const { body } = req;
  if (!isSubmitPostType(body)) {
    console.error("invalid body: ", body);
    throw new Error("invalid request");
  }
  const bodyWithTimeStamp = {
    ...body,
    createdAt: Admin.firestore.FieldValue.serverTimestamp(),
  };
  try {
    await store.collection("posts").add(bodyWithTimeStamp);
    response.status(204);
    response.json({});
  } catch (e) {
    response.status(500);
    response.json({ error: e });
  }
};
