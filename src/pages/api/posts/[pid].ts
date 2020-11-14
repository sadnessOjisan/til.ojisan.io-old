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
  try {
    const {
      query: { pid },
    } = request;
    if (!pid) {
      console.error("pid", pid);
      throw new Error("invalid request");
    }
    const snapshot = await store
      .collection("posts")
      .doc("GnDSL3Bg3rCtmgLJpkTp")
      .get();
    const data = await snapshot.data();
    response.json({ id: snapshot.id, ...data });
  } catch (e) {
    response.status(500);
    response.json({ error: e });
  }
};
