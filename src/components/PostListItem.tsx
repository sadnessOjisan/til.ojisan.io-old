import Link from "next/link";
import styled from "styled-components";
import { PostViewType } from "../entity/Post";

type PassedPropsType = {
  post: PostViewType;
};

interface Props extends PassedPropsType {
  className?: string;
}

const Component = (props: Props) => (
  <div className={props.className}>
    <Link href={`/posts/${props.post.id}`}>
      <a>
        <span>{props.post.createdAt}</span>
        <span>{props.post.title}</span>
        <span>
          [
          {props.post.tags.map((tag) => (
            <span>{tag.name},</span>
          ))}
          ]
        </span>
      </a>
    </Link>
  </div>
);

const StyledComponent = styled(Component)`
  color: white;
  margin-top: 12px;
  & > a {
    font-size: 16px;
    color: white;
    text-decoration: none;
    & > span {
      margin-left: 12px;
    }
  }
`;

export const PostListItem = StyledComponent;
