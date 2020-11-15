import Link from "next/link";
import styled from "styled-components";
import { PostViewType } from "../entity/Post";

type PassedPropsType = {
  children: React.ReactNode;
};

interface Props extends PassedPropsType {
  className?: string;
}

const Component = (props: Props) => (
  <div className={props.className}>{props.children}</div>
);

const StyledComponent = styled(Component)`
  background-color: black;
  min-height: 100vh;
  & > * {
    max-width: 960px;
    margin-left: auto;
    margin-right: auto;
  }
`;

export const Layout = StyledComponent;
