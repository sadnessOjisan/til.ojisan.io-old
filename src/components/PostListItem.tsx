import Link from "next/link";
import styled from "styled-components";
import { Color } from "../const/color";
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
        <span className="date">{props.post.formattedCreatedDate}</span>
        <span>{props.post.title}</span>
        <span className="tags">
          [
          {props.post.tags.map((tag) => (
            <Link href={`/tags/${tag.name}`}>
              <span className="tag" key={tag.name}>
                {tag.name}
              </span>
            </Link>
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
      margin-left: 18px;
    }
    &:hover {
      color: ${Color.link};
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
    }
    & > .date {
    }
  }
`;

export const PostListItem = StyledComponent;
