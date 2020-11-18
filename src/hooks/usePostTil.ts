import { useCallback, useEffect, useState } from "react";
import { Fetch } from "../infra/fetch";
import { FormPostType } from "../repository/dto/PostDTO";

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
    Fetch(`api/post`, {
      method: "POST",
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
