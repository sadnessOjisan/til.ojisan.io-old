import { Fetch } from "../infra/fetch";
import { DeletePostType, isDeletePostType } from "./dto/PostDTO";

export const deletePost = (postId: string, token: string) => {
  const body: DeletePostType = { id: postId };
  if (!isDeletePostType(body)) {
    console.error("<deletePost> invalid body: ", body);
    throw new Error("invalid request");
  }

  Fetch(`api/deletePost`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify({ id: postId }),
  })
    .then((res) => {
      if (res.status !== 204) {
        console.error(res);
        return;
      }
    })
    .catch((err) => {
      throw new Error(err);
      console.error(err);
    });
};
