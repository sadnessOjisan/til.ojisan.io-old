import Link from "next/link";
import styled from "styled-components";
import { Color } from "../const/color";
import { PostIndexPagePostType } from "../type/ui/Post";

export type PassedPropsType = {
  post: PostIndexPagePostType;
};

interface Props extends PassedPropsType {
  className?: string;
}

const Component = (props: Props) => (
  <div className={props.className}>
    <Link href={`/posts/${props.post.id}`}>
      <div>
        <span className="date">{props.post.createdAt}</span>
        <span className="title">{props.post.title}</span>
        <span className="tags">
          [
          {props.post.tags.map((tag) => (
            <Link href={`/tags/${tag.name}`} key={tag.name}>
              <span className="tag" key={tag.name}>
                {tag.name}
              </span>
            </Link>
          ))}
          ]
        </span>
      </div>
    </Link>
  </div>
);

const StyledComponent = styled(Component)`
  color: white;
  margin-top: 12px;

  & > div {
    display: flex;
    font-size: 16px;
    color: white;
    text-decoration: none;
    cursor: pointer;
    & > span {
      margin-left: 18px;
    }
    &:hover {
      color: ${Color.link};
    }
    & > .title {
      max-width: 70%;
    }
    & > .tags {
      & > .tag {
        margin: 0 4px;
        &::after {
          content: ",";
        }
        &:last-child {
          &::after {
            content: "";
          }
        }
        &:hover {
          text-decoration: underline;
        }
      }
      word-break: break-all;
    }
    & > .date {
    }
  }

  @media screen and (max-width: 1024px) {
    margin-top: 24px;
    & > div {
      flex-direction: column;
      & > .title {
        max-width: 100%;
      }
      & > .date {
        font-size: 12px;
      }
    }
  }
`;

export const PostListItem = StyledComponent;
