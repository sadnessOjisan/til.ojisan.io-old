import { useCallback, useEffect, useState } from "react";
import {
  HTMLContentType,
  isPost,
  PostType,
  SubmitPostType,
} from "../entity/Post";
import { Fetch } from "../infra/fetch";

export const usePostTil = (): [
  boolean,
  (body: SubmitPostType, token: string) => void,
  string
] => {
  const [sending, setSendingState] = useState(false);
  const [error, setErrorMessage] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [body, setBody] = useState<SubmitPostType | null>(null);
  useEffect(() => {
    if (body === null || token === null || sending === false) return;
    Fetch(`api/postTil`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res.status !== 200) {
          console.log(res);
          setErrorMessage("fail post");
          setSendingState(false);
          return;
        }
        setErrorMessage(null);
        setSendingState(false);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("fail post");
        setSendingState(false);
      });
  }, [sending]);

  const post = useCallback(
    (body: SubmitPostType, token: string): void => {
      setBody(body);
      setToken(token);
      setSendingState(true);
    },
    [token, body]
  );

  return [sending, post, error];
};
