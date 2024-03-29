import { GetStaticProps } from "next";
import { useRouter } from "next/dist/client/router";
import styled from "styled-components";
import { Layout } from "../../components/Layout";
import { Post } from "../../components/Post";
import { getPostById } from "../../repository/getPost";
import { getPostIds } from "../../repository/getPostIds";
import { getTags } from "../../repository/getTags";
import {
  PostDetailPagePostType,
  toPostIndexPagePostType,
} from "../../type/ui/Post";

interface InjectedProps {
  post?: PostDetailPagePostType;
  error?: string;
  isFallback: boolean;
}

interface Props extends InjectedProps {
  className?: string;
}

const Component = (props: Props) => (
  <>
    <Layout>
      <div className={props.className}>
        {props.isFallback ? (
          <div>generating file...</div>
        ) : (
          <>
            {props.post ? (
              <Post post={props.post}></Post>
            ) : (
              JSON.stringify(props.error)
            )}
          </>
        )}
      </div>
    </Layout>
  </>
);

const StyledComponent = styled(Component)`
  padding: 12px;
  color: white;
`;

const ContainerComponent = (props: InjectedProps) => {
  const router = useRouter();
  const isFallback = router.isFallback;
  const containerProps = {
    isFallback,
  };
  return (
    <StyledComponent
      {...{ ...containerProps }}
      {...{ ...props }}
    ></StyledComponent>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { pid } = context.params;
  if (typeof pid !== "string") return;
  const postResponse = await getPostById(pid);

  const { data, error } = postResponse;
  if (error) {
    return { props: { error } };
  }
  const tagIds = data.tags;
  const tagsResponse = await getTags(tagIds);
  const tagData = tagsResponse.data;
  const viewData = toPostIndexPagePostType(data, tagData);
  return {
    // HACK: undefined は埋め込めないため
    props: !error ? { post: viewData } : { error },
    revalidate: 600,
  };
};

export async function getStaticPaths() {
  const postIdsResponse = await getPostIds();
  const { data, error } = postIdsResponse;
  return {
    // / を忘れるな
    paths: !error ? data.map((id) => `/posts/${id}`) : [],
    fallback: true,
  };
}

export default ContainerComponent;
