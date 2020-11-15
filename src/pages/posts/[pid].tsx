import { GetStaticProps } from "next";
import styled from "styled-components";
import { createPostForView, PostType, PostViewType } from "../../entity/Post";
import { getPostById } from "../../repository/getPost";
import { getPostIds } from "../../repository/getPostIds";

type Props = {
  post?: PostViewType;
  error?: string;
  className?: string;
};

const Component = (props: Props) => (
  <div className={props.className}>
    {props.post ? (
      <div>
        <h1>{props.post.title}</h1>
        <p>
          {props.post.tags.map((tag) => (
            <div>{tag.name}</div>
          ))}
        </p>
        <p>{props.post.createdAt}</p>
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
