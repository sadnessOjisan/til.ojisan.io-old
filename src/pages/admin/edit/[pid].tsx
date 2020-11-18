import { GetStaticProps } from "next";
import { useRouter } from "next/dist/client/router";
import styled from "styled-components";
import { Layout } from "../../../components/Layout";
import { Post } from "../../../components/Post";
import { PostEditForm } from "../../../components/PostEditForm";
import { createPostForView, PostViewType } from "../../../entity/Post";
import { getPostById } from "../../../repository/getPost";
import { getPostIds } from "../../../repository/getPostIds";
import { getTags } from "../../../repository/getTags";

interface InjectedProps {
  post?: PostViewType;
  error?: string;
  isFallback: boolean;
}

interface Props extends InjectedProps {
  className?: string;
}

const Component = (props: Props) => (
  <>
    <div className={props.className}>
      {props.isFallback ? (
        <div>generating file...</div>
      ) : (
        <>
          {props.post ? (
            <PostEditForm post={props.post}></PostEditForm>
          ) : (
            JSON.stringify(props.error)
          )}
        </>
      )}
    </div>
  </>
);

const StyledComponent = styled(Component)`
  padding: 12px;
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

export const getServerSideProps = async (context) => {
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
  const viewData = createPostForView(data, tagData, true);
  return {
    // HACK: undefined は埋め込めないため
    props: !error ? { post: viewData } : { error },
  };
};

export default ContainerComponent;
