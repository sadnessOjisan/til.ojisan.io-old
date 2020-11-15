import { NextApiRequest, NextApiResponse } from "next";
import { isPosts } from "../../../entity/Post";
import { store } from "../../../infra/FirebaseServer";

export default async (_: NextApiRequest, response: NextApiResponse) => {
  const documents = await store.collection("posts").get();
  const posts = documents.docs.map((d) => {
    const post = {
      id: d.id,
      ...d.data(),
    };
    return post;
  });
  if (!isPosts(posts)) {
    throw new Error("invalid data");
  }
  const sortedPosts = posts.sort((a, b) =>
    a.createdAt < b.createdAt ? 1 : -1
  );
  response.json(sortedPosts);
};
