import firebase from "firebase";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { Login } from "../../components/Login";
import { usePostTil } from "../../hooks/usePostTil";
import Firebase from "../../infra/FirebaseClient";
import { toHTMLContentType } from "../../type/model/Post";
import { createTag, toTag } from "../../type/model/Tag";

interface ContainerProps {
  user: firebase.User;
  loading: boolean;
  error: firebase.auth.Error;
  handlePost: (e: FormEvent<HTMLFormElement>) => void;
  sending: boolean;
  postError: string;
}

interface Props extends ContainerProps {
  className?: string;
}

const Component = (props: Props) => (
  <div className={props.className}>
    {props.loading ? (
      <div>loading</div>
    ) : props.error ? (
      <div>error</div>
    ) : (
      <div>
        {props.user ? (
          <div>
            <Link href="/">posts</Link>
            <h1>post til</h1>
            {props.sending ? (
              <div>sending</div>
            ) : (
              <form
                onSubmit={(e) => {
                  props.handlePost(e);
                }}
              >
                <div>
                  <label>title</label>
                  <input name="title" type="text"></input>
                </div>
                <div>
                  <label>content</label>
                  <textarea name="content" cols={100} rows={30}></textarea>
                </div>
                <div>
                  <label>tags</label>
                  <input name="tags" type="text"></input>
                </div>
                <button type="submit">submit</button>
              </form>
            )}
          </div>
        ) : (
          <Login></Login>
        )}
      </div>
    )}
  </div>
);

const StyledComponent = styled(Component)`
  & input {
    width: 300px;
    height: 30px;
    margin: 12px;
  }

  & button {
    width: 100px;
    height: 60px;
  }
`;

const ContainerComponent = () => {
  const [user, loading, error] = useAuthState(Firebase.instance.auth);
  const [token, setToken] = useState<string | null>(null);
  const [sending, post, postError] = usePostTil();

  const handlePost = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = e.target["title"].value;
    const content = e.target["content"].value;
    const tagsString = e.target["tags"].value;
    if (
      typeof title !== "string" ||
      typeof content !== "string" ||
      typeof tagsString !== "string"
    ) {
      throw new Error("データがたりません");
    }
    const tags = tagsString
      .replace(" ", "")
      .split(",")
      .map((tag) => createTag(tag));
    const html = toHTMLContentType(content);
    post({ title, content: html, tags }, token);
  };

  if (user) {
    user.getIdToken(true).then((d) => {
      setToken(d);
    });
  }
  const containerProps = {
    user,
    loading,
    error,
    handlePost,
    sending,
    postError,
  };
  return <StyledComponent {...{ ...containerProps }}></StyledComponent>;
};

export default ContainerComponent;
