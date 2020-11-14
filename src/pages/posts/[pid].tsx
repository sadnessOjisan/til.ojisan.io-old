import { GetStaticProps } from "next";
import styled from "styled-components";
import { PostType } from "../../entity/Post";
import { getPostById } from "../../repository/getPost";
import { getPostIds } from "../../repository/getPostIds";

type Props = {
  post?: PostType;
  error?: string;
  className?: string;
};

const Component = (props: Props) => (
  <div className={props.className}>
    {props.post ? (
      <div>
        <h1>{props.post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: props.post.content }}></div>
      </div>
    ) : (
      JSON.stringify(props.error)
    )}
  </div>
);

const StyledComponent = styled(Component)`
  color: red;
`;

export const getStaticProps: GetStaticProps = async (context) => {
  const { pid } = context.params;
  if (typeof pid !== "string") return;
  const postResponse = await getPostById(pid);
  const { data, error } = postResponse;
  return {
    // HACK: undefined は埋め込めないため
    props: !error ? { post: data } : { error },
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
