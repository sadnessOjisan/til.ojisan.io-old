import firebase from "firebase";
import { FormEvent } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import Firebase from "../infra/FirebaseClient";
import { signin } from "../repository/signin";

interface ContainerProps {
  user: firebase.User;
  handleLogin: (e: FormEvent<HTMLFormElement>) => void;
}

interface Props extends ContainerProps {
  className?: string;
}

const Component = (props: Props) => (
  <div className={props.className}>
    {props.user ? (
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
    ) : (
      <div>loading</div>
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
  const [user] = useAuthState(Firebase.instance.auth);

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.target["email"].value;
    const pass = e.target["pass"].value;
    if (typeof email !== "string" || typeof pass !== "string") {
      throw new Error("invalid input");
    }
    signin(email, pass);
  };

  const containerProps = {
    user,
    handleLogin,
  };
  return <StyledComponent {...{ ...containerProps }}></StyledComponent>;
};

export const Login = ContainerComponent;
