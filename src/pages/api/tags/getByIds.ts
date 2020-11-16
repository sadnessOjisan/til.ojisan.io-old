import * as admin from "firebase-admin";
import { NextApiRequest, NextApiResponse } from "next";
import Firebase from "../../../infra/FirebaseClient";
import { store } from "../../../infra/FirebaseServer";

export default async (request: NextApiRequest, response: NextApiResponse) => {
  try {
    const {
      query: { ids },
    } = request;
    const parsedIds = JSON.parse(ids as string);
    if (!Array.isArray(parsedIds)) {
      console.error("parsedIds", parsedIds);
      throw new Error("invalid request");
    }
    const documents = await store
      .collection("tags")
      .where(admin.firestore.FieldPath.documentId(), "in", parsedIds)
      .get();
    const tags = documents.docs.map((d) => {
      return d.data();
    });
    response.json(tags);
  } catch (e) {
    console.error(e);
    response.status(500);
    response.json({ error: e });
  }
};
