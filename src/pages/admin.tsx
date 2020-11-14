import styled from "styled-components";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Firebase from "../infra/FirebaseClient";
import { FormEvent, useState } from "react";
import { signin } from "../repository/signin";
import { postTil } from "../repository/post";

interface ContainerProps {
  user: firebase.User;
  loading: boolean;
  error: firebase.auth.Error;
  token?: string;
}

interface Props extends ContainerProps {
  className?: string;
}

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
  if (typeof title !== "string" || typeof content !== "string") {
    throw new Error("invalid input");
  }
  postTil(title, content, token);
};

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
            <h1>post til</h1>
            <form
              onSubmit={(e) => {
                handlePost(e, props.token);
              }}
            >
              <input name="title" type="text"></input>
              <textarea name="content"></textarea>
              <button type="submit">submit</button>
            </form>
          </div>
        ) : (
          <div>
            <h1>login</h1>
            <form
              onSubmit={(e) => {
                handleLogin(e);
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
  color: red;
`;

const ContainerComponent = () => {
  const [user, loading, error] = useAuthState(Firebase.instance.auth);
  const [token, setToken] = useState<string | null>(null);
  console.log(user);
  if (user) {
    user.getIdToken(true).then((d) => {
      setToken(d);
    });
  }
  const containerProps = { user, loading, error, token };
  return <StyledComponent {...{ ...containerProps }}></StyledComponent>;
};

export default ContainerComponent;
