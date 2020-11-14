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

export default async (request: NextApiRequest, response: NextApiResponse) => {
  try {
    const {
      query: { pid },
    } = request;
    if (typeof pid !== "string") {
      console.error("pid", pid);
      throw new Error("invalid request");
    }
    const snapshot = await store.collection("posts").doc(pid).get();
    const data = await snapshot.data();
    response.json({ id: snapshot.id, ...data });
  } catch (e) {
    response.status(500);
    response.json({ error: e });
  }
};
