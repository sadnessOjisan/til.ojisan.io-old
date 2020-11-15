import firebase from "firebase";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { createHTMLString } from "../entity/Post";
import { createTag } from "../entity/Tag";
import Firebase from "../infra/FirebaseClient";
import { usePostTil } from "../repository/post";
import { signin } from "../repository/signin";

interface ContainerProps {
  user: firebase.User;
  loading: boolean;
  error: firebase.auth.Error;
  token?: string;
  handlePost: (e: FormEvent<HTMLFormElement>, token: string) => void;
  handleLogin: (e: FormEvent<HTMLFormElement>) => void;
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
        {props.user && props.token ? (
          <div>
            <Link href="/">posts</Link>
            <h1>post til</h1>
            {props.sending ? (
              <div>sending</div>
            ) : (
              <form
                onSubmit={(e) => {
                  props.handlePost(e, props.token);
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
          <div>
            <h1>login</h1>
            <form
              onSubmit={(e) => {
                props.handleLogin(e);
              }}
            >
              <label>email</label>
              <input name="email" type="email"></input>
              <label>pass</label>
              <input name="pass" type="password"></input>
              <button type="submit">submit</button>
            </form>
          </div>
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

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.target["email"].value;
    const pass = e.target["pass"].value;
    if (typeof email !== "string" || typeof pass !== "string") {
      throw new Error("invalid input");
    }
    signin(email, pass);
  };

  const handlePost = (e: FormEvent<HTMLFormElement>, token: string) => {
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
    const html = createHTMLString(content);
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
    token,
    handleLogin,
    handlePost,
    sending,
    postError,
  };
  return <StyledComponent {...{ ...containerProps }}></StyledComponent>;
};

export default ContainerComponent;
