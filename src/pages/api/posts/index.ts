import * as admin from "firebase-admin";
import { NextApiRequest, NextApiResponse } from "next";

const cert = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
};
try {
  admin.initializeApp({
    credential: admin.credential.cert(cert),
  });
} catch (e) {
  console.log(e);
}

const store = admin.firestore();

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const documents = await store.collection("posts").get();
  const posts = documents.docs.map((d) => {
    const post = {
      id: d.id,
      ...d.data(),
    };
    return post;
  });
  response.json(posts);
};
