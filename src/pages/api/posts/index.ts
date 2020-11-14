import * as admin from "firebase-admin";
import { NextApiRequest, NextApiResponse } from "next";
import { FireStore } from "../../../infra/FirebaseServer";

const store = FireStore;

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
