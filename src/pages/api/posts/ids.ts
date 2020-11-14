import * as admin from "firebase-admin";
import { NextApiRequest, NextApiResponse } from "next";
import { FireStore } from "../../../infra/FirebaseServer";

const store = FireStore;

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
