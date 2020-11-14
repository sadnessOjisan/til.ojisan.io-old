import styled from "styled-components";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Firebase from "../infra/firebaseClient";
import { FormEvent } from "react";
import { signin } from "../repository/signin";

interface ContainerProps {
  user: firebase.User;
  loading: boolean;
  error: firebase.auth.Error;
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
            <h1>post til</h1>
            <form onSubmit={() => {}}>
              <input name="title" type="text"></input>
              <textarea name="post"></textarea>
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
              <input name="email" type="email"></input>
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
  const containerProps = { user, loading, error };
  return <StyledComponent {...{ ...containerProps }}></StyledComponent>;
};

export default ContainerComponent;
