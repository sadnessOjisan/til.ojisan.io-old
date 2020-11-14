import * as admin from "firebase-admin";
import { NextApiRequest, NextApiResponse } from "next";
import { isSubmitPostType } from "../../entity/Post";
import { FireStore } from "../../infra/FirebaseServer";

const store = FireStore;

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
  try {
    await store.collection("posts").add(body);
    response.status(204);
    response.json({});
  } catch (e) {
    response.status(500);
    response.json({ error: e });
  }
};
