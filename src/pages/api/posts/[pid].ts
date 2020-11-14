// import * as admin from "firebase-admin";
import { NextApiRequest, NextApiResponse } from "next";

// const cert = {
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//   // zeit now の環境変数だと\nが\\nにエスケープされてしまっているので元に戻す? .replace(/\\n/g, "\n")
//   privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
// };
// admin.initializeApp({
//   credential: admin.credential.cert(cert),
// });

// const store = admin.firestore();

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const {
    query: { pid },
  } = request;
  if (!pid) {
    console.error("pid", pid);
    throw new Error("invalid request");
  }
  // const data = await (await store.doc("").get()).data();
  const data = { id: pid, title: "sample" };
  response.json(data);
};
