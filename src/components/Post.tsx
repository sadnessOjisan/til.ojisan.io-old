import Link from "next/link";
import styled from "styled-components";
import { Color } from "../const/color";
import { PostDetailPagePostType } from "../type/ui/Post";
import { toFormattedDateTimeForURLTypeFromJapaneseDateType } from "../type/util";
import { PostBody } from "./PostBody";
import { Tag } from "./Tag";

type PassedPropsType = {
  post: PostDetailPagePostType;
};

interface Props extends PassedPropsType {
  className?: string;
}

const Component = (props: Props) => (
  <div className={props.className}>
    <h1 className="title">{props.post.title}</h1>
    <div className="tags">
      {props.post.tags.map((tag) => (
        <Link href={`/tags/${tag.name}`} key={tag.name}>
          <a>
            <Tag tag={tag}></Tag>
          </a>
        </Link>
      ))}
    </div>
    <Link
      href={`/dates/${toFormattedDateTimeForURLTypeFromJapaneseDateType(
        props.post.createdAt
      )}`}
    >
      <p className="date">{props.post.createdAt}</p>
    </Link>
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
    flex-wrap: wrap;
    margin: 24px 0px;
    & > * {
      margin-right: 12px;
      margin-bottom: 12px;
      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
    & > a {
      text-decoration: none;
    }
  }
  & > .date {
    margin-top: 12px;
    color: ${Color.paragraph};
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const Post = StyledComponent;
