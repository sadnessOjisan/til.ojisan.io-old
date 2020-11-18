import Link from "next/link";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { Color } from "../const/color";
import { PostViewType } from "../entity/Post";
import Firebase from "../infra/FirebaseClient";
import { deletePost } from "../repository/deletePost";
import TurndownService from "turndown";

interface PassedProps {
  post: PostViewType;
}

interface ContainerProps {
  handleClickDeleteButtonClick: (id: string) => void;
}

interface Props extends PassedProps, ContainerProps {
  className?: string;
}

const turndownService = new TurndownService();

const Component = (props: Props) => (
  <div className={props.className}>
    <h1>編集ページ</h1>
    <div>
      <label>title</label>
      <input defaultValue={props.post.title}></input>
    </div>
    <div>
      <label>content</label>
      <textarea
        defaultValue={turndownService.turndown(props.post.content)}
        cols={80}
        rows={30}
      ></textarea>
    </div>
    <div>
      <label>tags</label>
      <input
        defaultValue={props.post.tags.map((tag) => tag.name).join(",")}
      ></input>
    </div>
    <button onClick={() => {}}>送信</button>
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

export const PostEditForm = ContainerComponent;
