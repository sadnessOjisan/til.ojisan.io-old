import * as admin from "firebase-admin";
import { NextApiRequest, NextApiResponse } from "next";
import { store } from "../../../infra/FirebaseServer";

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
