import { GetStaticProps } from "next";
import styled from "styled-components";
import { PostType } from "../../entity/Post";
import { getPostById } from "../../repository/getPost";

type Props = {
  post?: PostType;
  error?: string;
  className?: string;
};

const Component = (props: Props) => (
  <div className={props.className}>
    hello world!!
    {props.post ? JSON.stringify(props.post) : JSON.stringify(props.error)}
  </div>
);

const StyledComponent = styled(Component)`
  color: red;
`;

export const getStaticProps: GetStaticProps = async (context) => {
  const { pid } = context.params;
  console.log("pid", pid);
  if (typeof pid !== "string") return;
  const postResponse = await getPostById(pid);
  const { data, error } = postResponse;
  console.log("data", data);
  console.log("error", error);
  return {
    // HACK: undefined は埋め込めないため
    props: !error ? { post: data } : { error },
    revalidate: 1,
  };
};

export async function getStaticPaths() {
  return {
    // / を忘れるな
    paths: [`/posts/GnDSL3Bg3rCtmgLJpkTp`],
    fallback: false,
  };
}

export default StyledComponent;
