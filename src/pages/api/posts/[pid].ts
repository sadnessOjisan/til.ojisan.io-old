import * as admin from "firebase-admin";
import { NextApiRequest, NextApiResponse } from "next";
import { shape } from "prop-types";

const cert = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  // zeit now の環境変数だと\nが\\nにエスケープされてしまっているので元に戻す? .replace(/\\n/g, "\n")
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
};
console.log("certcertcertcert", cert);
try {
  admin.initializeApp({
    credential: admin.credential.cert(cert),
  });
} catch (e) {
  console.log(e);
}
console.log("certcertcertcert", cert);

const store = admin.firestore();

export default async (request: NextApiRequest, response: NextApiResponse) => {
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
};
