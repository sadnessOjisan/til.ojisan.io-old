import { useCallback, useEffect, useState } from "react";
import { FormPostType } from "../entity/Post";
import { postTil } from "../repository/post";

export const usePostTil = (): [
  boolean,
  (body: FormPostType, token: string) => void,
  string
] => {
  const [sending, setSendingState] = useState(false);
  const [error, setErrorMessage] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [body, setBody] = useState<FormPostType | null>(null);
  useEffect(() => {
    if (body === null || token === null || sending === false) return;
    postTil(body, token)
      .then(() => {
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
