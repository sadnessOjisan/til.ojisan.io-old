import * as admin from "firebase-admin";
import { NextApiRequest, NextApiResponse } from "next";
import { isSubmitPostType } from "../../entity/Post";

const cert = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
};
try {
  admin.initializeApp({
    credential: admin.credential.cert(cert),
  });
} catch (e) {
  console.log(e);
}

const store = admin.firestore();

export default async (req: NextApiRequest, response: NextApiResponse) => {
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
