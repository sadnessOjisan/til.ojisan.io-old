import { GetStaticProps } from "next";
import styled from "styled-components";
import { getPostById } from "../../repository/getPost";

type Props = {
  className?: string;
};

const Component = (props: Props) => (
  <div className={props.className}>hello world!!{JSON.stringify(props)}</div>
);

const StyledComponent = styled(Component)`
  color: red;
`;

export const getStaticProps: GetStaticProps = async (context) => {
  const { pid } = context.params;
  console.log("pid", pid);
  if (typeof pid !== "string") return;
  const post = await getPostById(pid);
  return {
    props: { post },
    revalidate: 1,
  };
};

export async function getStaticPaths() {
  return {
    // / を忘れるな
    paths: [`/articles/1`],
    fallback: false,
  };
}

export default StyledComponent;
