import { NextApiRequest, NextApiResponse } from "next";
import { store } from "../../../infra/FirebaseServer";

export default async (_: NextApiRequest, response: NextApiResponse) => {
  try {
    const documents = await store.collection("tags").get();
    const postIds = documents.docs.map((d) => {
      return d.id;
    });
    response.json(postIds);
  } catch (e) {
    response.status(500);
    response.json({ error: e });
  }
};
