import styled from "styled-components";
import { Color } from "../const/color";
import { PostViewType } from "../entity/Post";
import { PostBody } from "./PostBody";
import { Tag } from "./Tag";

type PassedPropsType = {
  post: PostViewType;
};

interface Props extends PassedPropsType {
  className?: string;
}

const Component = (props: Props) => (
  <div className={props.className}>
    <h1 className="title">{props.post.title}</h1>
    <div className="tags">
      {props.post.tags.map((tag) => (
        <Tag tag={tag} key={tag.name}></Tag>
      ))}
    </div>
    <p className="date">{props.post.createdAt}</p>
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
  & > .tags {
    display: flex;
    & > * {
      margin-right: 12px;
    }
  }
  & > .date {
    margin-top: 12px;
    color: ${Color.paragraph};
  }
`;

export const Post = StyledComponent;
