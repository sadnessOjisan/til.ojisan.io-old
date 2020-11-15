import Link from "next/link";
import styled from "styled-components";
import { PostViewType } from "../entity/Post";
import { PostBody } from "./PostBody";

type PassedPropsType = {
  post: PostViewType;
};

interface Props extends PassedPropsType {
  className?: string;
}

const Component = (props: Props) => (
  <div className={props.className}>
    <h1 className="title">{props.post.title}</h1>
    <p>
      {props.post.tags.map((tag) => (
        <span>#{tag.name}</span>
      ))}
    </p>
    <p>{props.post.createdAt}</p>
    <PostBody content={props.post.content} className="body"></PostBody>
  </div>
);

const StyledComponent = styled(Component)`
  color: white;
  & > .title {
    font-size: 40px;
  }
  & > .body {
    margin-top: 36px;
  }
`;

export const Post = StyledComponent;
