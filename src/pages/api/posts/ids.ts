import * as admin from "firebase-admin";
import { NextApiRequest, NextApiResponse } from "next";

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

export default async (_: NextApiRequest, response: NextApiResponse) => {
  try {
    const documents = await store.collection("posts").get();
    const postIds = documents.docs.map((d) => {
      return d.id;
    });
    response.json(postIds);
  } catch (e) {
    response.status(500);
    response.json({ error: e });
  }
};
