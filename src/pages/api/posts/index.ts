import { NextApiRequest, NextApiResponse } from "next";
import { store } from "../../../infra/FirebaseServer";

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
