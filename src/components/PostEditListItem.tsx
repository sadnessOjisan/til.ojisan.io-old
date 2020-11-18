import Link from "next/link";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { Color } from "../const/color";
import { PostViewType } from "../entity/Post";
import Firebase from "../infra/FirebaseClient";
import { deletePost } from "../repository/deletePost";

interface PassedProps {
  post: PostViewType;
}

interface ContainerProps {
  handleClickDeleteButtonClick: (id: string) => void;
}

interface Props extends PassedProps, ContainerProps {
  className?: string;
}

const Component = (props: Props) => (
  <div className={props.className}>
    <span className="date">{props.post.formattedCreatedDate}</span>
    <span>{props.post.title}</span>
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
    <Link href={`/posts/${props.post.id}`}>
      <a>記事</a>
    </Link>
    <Link href={`/posts/edit/${props.post.id}`}>
      <a>Edit</a>
    </Link>
    <button onClick={() => props.handleClickDeleteButtonClick(props.post.id)}>
      削除
    </button>
  </div>
);

const StyledComponent = styled(Component)`
  margin-top: 12px;

  & > a {
    font-size: 16px;
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

const ContainerComponent = (props: PassedProps) => {
  const [user] = useAuthState(Firebase.instance.auth);
  const [token, setToken] = useState<string | null>(null);
  // 削除時、SSRした記事をコンポーネントを見えなくするためのフラグ
  const [isDeleted, setDelete] = useState(false);
  if (user) {
    user.getIdToken(true).then((d) => {
      setToken(d);
    });
  }
  const handleClickDeleteButtonClick = (id: string) => {
    if (!user || !token) {
      alert("you should login");
      return;
    }
    try {
      deletePost(id, token);
    } catch (e) {
      setDelete(true);
    }
  };
  const containerProps = { handleClickDeleteButtonClick };
  return (
    !isDeleted && (
      <StyledComponent
        {...{ ...containerProps }}
        {...{ ...props }}
      ></StyledComponent>
    )
  );
};

export const PostEditListItem = ContainerComponent;
