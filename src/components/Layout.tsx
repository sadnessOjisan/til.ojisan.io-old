import styled from "styled-components";
import { Footer } from "./Footer";

type PassedPropsType = {
  children: React.ReactNode;
};

interface Props extends PassedPropsType {
  className?: string;
}

const Component = (props: Props) => (
  <div className={props.className}>
    <div className="body">{props.children}</div>
    <Footer className="footer"></Footer>
  </div>
);

const StyledComponent = styled(Component)`
  background-color: black;
  & > .body {
    min-height: 90vh;
    max-width: 960px;
    margin-left: auto;
    margin-right: auto;
  }
  & > .footer {
    height: 10vh;
    margin-top: auto;
    margin-bottom: 0;
  }
`;

export const Layout = StyledComponent;
