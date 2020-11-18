import firebase from "firebase";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { Login } from "../../components/Login";
import { PostEditListItem } from "../../components/PostEditListItem";
import {
  createHTMLString,
  createPostForView,
  PostViewType,
} from "../../entity/Post";
import { createTag } from "../../entity/Tag";
import { usePostTil } from "../../hooks/usePostTil";
import Firebase from "../../infra/FirebaseClient";
import { getPosts } from "../../repository/getPosts";
import { getTags } from "../../repository/getTags";

interface ContainerProps {
  user: firebase.User;
  loading: boolean;
  error: firebase.auth.Error;
  token?: string;
  handlePost: (e: FormEvent<HTMLFormElement>, token: string) => void;
  sending: boolean;
  postError: string;
}

interface PassedProps {
  posts?: PostViewType[];
}

interface Props extends ContainerProps, PassedProps {
  className?: string;
}

const Component = (props: Props) => (
  <div className={props.className}>
    {props.loading ? (
      <div>loading</div>
    ) : props.error ? (
      <div>error</div>
    ) : (
      <div>
        <Link href="/admin/new">新規追加</Link>
        {props.user && props.posts ? (
          props.posts.map((post) => (
            <PostEditListItem post={post} key={post.id}></PostEditListItem>
          ))
        ) : (
          <Login></Login>
        )}
      </div>
    )}
  </div>
);

const StyledComponent = styled(Component)`
  & input {
    width: 300px;
    height: 30px;
    margin: 12px;
  }

  & button {
    width: 100px;
    height: 60px;
  }
`;

const ContainerComponent = (props: PassedProps) => {
  const [user, loading, error] = useAuthState(Firebase.instance.auth);
  const [token, setToken] = useState<string | null>(null);
  const [sending, post, postError] = usePostTil();

  const handlePost = (e: FormEvent<HTMLFormElement>, token: string) => {
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
    post({ title, content: html, tags }, token);
  };

  if (user) {
    user.getIdToken(true).then((d) => {
      setToken(d);
    });
  }
  const containerProps = {
    user,
    loading,
    error,
    token,
    handlePost,
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

export const getServerSideProps = async (context) => {
  const postResponse = await getPosts();
  const { data, error } = postResponse;
  if (error) {
    return {
      // HACK: undefined は埋め込めないため
      props: { error },
    };
  }

  const viewData = await Promise.all(
    data.map(async (d) => {
      const tagsResponse = await getTags(d.tags);
      const tagData = tagsResponse.data;
      return createPostForView(d, tagData, false);
    })
  );

  const sortedData = viewData.sort((a, b) =>
    a.createdAt < b.createdAt ? 1 : -1
  );

  return {
    // HACK: undefined は埋め込めないため
    props: !error ? { posts: sortedData } : { error },
  };
};

export default ContainerComponent;
