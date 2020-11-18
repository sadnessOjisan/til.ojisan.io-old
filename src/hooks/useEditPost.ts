import { useCallback, useEffect, useState } from "react";
import { FormEditPostType, FormPostType } from "../entity/Post";
import { Fetch } from "../infra/fetch";

export const useEditPost = (): [
  boolean,
  (body: FormEditPostType, token: string) => void,
  string
] => {
  const [sending, setSendingState] = useState(false);
  const [error, setErrorMessage] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [body, setBody] = useState<FormPostType | null>(null);
  useEffect(() => {
    if (body === null || token === null || sending === false) return;
    Fetch(`api/editPost`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res.status !== 200) {
          console.error(res);
          setErrorMessage("fail post");
          setSendingState(false);
          return;
        }
        setErrorMessage(null);
        setSendingState(false);
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage("fail post");
        setSendingState(false);
      });
  }, [sending]);

  const post = useCallback(
    (body: FormPostType, token: string): void => {
      setBody(body);
      setToken(token);
      setSendingState(true);
    },
    [token, body]
  );

  return [sending, post, error];
};
