import { GetStaticProps } from "next";
import styled from "styled-components";
import { PostListItem } from "../components/PostListItem";
import { Layout } from "../components/Layout";
import { createPostForView, PostViewType } from "../entity/Post";
import { getPosts } from "../repository/getPosts";
import { Color } from "../const/color";

type Props = {
  posts?: PostViewType[];
  error?: string;
  className?: string;
};

const Component = (props: Props) => (
  <Layout>
    <div className={props.className}>
      <h1>
        <span>T</span>oday oj<span>I</span>san <span>L</span>earned
      </h1>
      {props.posts
        ? props.posts.map((post) => <PostListItem post={post}></PostListItem>)
        : JSON.stringify(props.error)}
    </div>
  </Layout>
);

const StyledComponent = styled(Component)`
  color: white;
  & > h1 {
    font-size: 40px;
    text-align: center;
    & > span {
      color: ${Color.highlight};
    }
  }
`;

export const getStaticProps: GetStaticProps = async (context) => {
  const postResponse = await getPosts();
  const { data, error } = postResponse;
  const viewData = data.map((d) => createPostForView(d));
  return {
    // HACK: undefined は埋め込めないため
    props: !error ? { posts: viewData } : { error },
    revalidate: 1,
  };
};

export default StyledComponent;
