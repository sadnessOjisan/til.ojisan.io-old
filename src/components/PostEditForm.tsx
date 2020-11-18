import { FormEvent, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { Color } from "../const/color";
import { createHTMLString, PostViewType } from "../entity/Post";
import Firebase from "../infra/FirebaseClient";
import TurndownService from "turndown";
import { createTag } from "../entity/Tag";
import { useEditPost } from "../hooks/useEditPost";
import { Login } from "./Login";

interface PassedProps {
  post: PostViewType;
}

interface ContainerProps {
  user: firebase.User;
  loading: boolean;
  error: firebase.auth.Error;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  sending: boolean;
  postError: string;
}

interface Props extends PassedProps, ContainerProps {
  className?: string;
}

const turndownService = new TurndownService();

const Component = (props: Props) => (
  <div className={props.className}>
    {props.loading ? (
      <div>loading</div>
    ) : props.error ? (
      <div>error</div>
    ) : (
      <div>
        {props.user ? (
          <div>
            <h1>編集ページ</h1>
            <form onSubmit={props.handleSubmit}>
              <div>
                <label>title</label>
                <input
                  name="title"
                  type="text"
                  defaultValue={props.post.title}
                ></input>
              </div>
              <div>
                <label>content</label>
                <textarea
                  name="content"
                  defaultValue={turndownService.turndown(props.post.content)}
                  cols={80}
                  rows={30}
                ></textarea>
              </div>
              <div>
                <label>tags</label>
                <input
                  name="tags"
                  type="text"
                  defaultValue={props.post.tags
                    .map((tag) => tag.name)
                    .join(",")}
                ></input>
              </div>
              <button onClick={() => {}}>送信</button>
            </form>
          </div>
        ) : (
          <Login></Login>
        )}
      </div>
    )}
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
  const [user, loading, error] = useAuthState(Firebase.instance.auth);
  const [token, setToken] = useState<string | null>(null);
  // 削除時、SSRした記事をコンポーネントを見えなくするためのフラグ
  const [sending, post, postError] = useEditPost();
  if (user) {
    user.getIdToken(true).then((d) => {
      setToken(d);
    });
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = e.target["title"].value;
    const content = e.target["content"].value;
    const tagsString = e.target["tags"].value;
    if (
      typeof title !== "string" ||
      typeof content !== "string" ||
      typeof tagsString !== "string"
    ) {
      throw new Error("データがたりません");
    }
    const tags = tagsString
      .replace(" ", "")
      .split(",")
      .map((tag) => createTag(tag));
    const html = createHTMLString(content);
    post({ title, content: html, tags, id: props.post.id }, token);
  };
  const containerProps = {
    user,
    loading,
    error,
    handleSubmit,
    sending,
    postError,
  };
  return (
    <StyledComponent
      {...{ ...containerProps }}
      {...{ ...props }}
    ></StyledComponent>
  );
};

export const PostEditForm = ContainerComponent;
