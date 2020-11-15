import { GetStaticProps } from "next";
import styled from "styled-components";
import { Layout } from "../../components/Layout";
import { Post } from "../../components/Post";
import { createPostForView, PostType, PostViewType } from "../../entity/Post";
import { getPostById } from "../../repository/getPost";
import { getPostIds } from "../../repository/getPostIds";

type Props = {
  post?: PostViewType;
  error?: string;
  className?: string;
};

const Component = (props: Props) => (
  <Layout>
    <div className={props.className}>
      {props.post ? (
        <Post post={props.post}></Post>
      ) : (
        JSON.stringify(props.error)
      )}
    </div>
  </Layout>
);

const StyledComponent = styled(Component)`
  padding: 12px;
  color: white;
`;

export const getStaticProps: GetStaticProps = async (context) => {
  const { pid } = context.params;
  if (typeof pid !== "string") return;
  const postResponse = await getPostById(pid);
  const { data, error } = postResponse;
  const viewData = createPostForView(data);
  return {
    // HACK: undefined は埋め込めないため
    props: !error ? { post: viewData } : { error },
    revalidate: 1,
  };
};

export async function getStaticPaths() {
  const postIdsResponse = await getPostIds();
  const { data, error } = postIdsResponse;
  return {
    // / を忘れるな
    paths: !error ? data.map((id) => `/posts/${id}`) : [],
    fallback: false,
  };
}

export default StyledComponent;
