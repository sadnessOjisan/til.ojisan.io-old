import styled from "styled-components";

type Props = {
  className?: string;
};

const Component = (props: Props) => (
  <div className={props.className}>hello world!!</div>
);

const StyledComponent = styled(Component)`
  color: red;
`;

type StaticProps = { params: { slug: string } };
export const getStaticProps = async ({ params }: StaticProps) => {
  const article = await fetchArticle(params.slug);
  return {
    props: { article },
    revalidate: 1,
  };
};

export default StyledComponent;
