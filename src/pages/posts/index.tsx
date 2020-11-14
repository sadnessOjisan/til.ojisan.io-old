import { GetStaticProps } from "next";
import Link from "next/link";
import styled from "styled-components";
import { PostType } from "../../entity/Post";
import { getPosts } from "../../repository/getPosts";

type Props = {
  posts?: PostType[];
  error?: string;
  className?: string;
};

const Component = (props: Props) => (
  <div className={props.className}>
    hello world!!
    {props.posts
      ? props.posts.map((post) => (
          <div key={post.id}>
            <Link href={`/posts/${post.id}`}>
              <a>
                <p>id:{post.id}</p>
                <p>title:{post.title}</p>
              </a>
            </Link>
          </div>
        ))
      : JSON.stringify(props.error)}
  </div>
);

const StyledComponent = styled(Component)`
  color: red;
`;

export const getStaticProps: GetStaticProps = async (context) => {
  const postResponse = await getPosts();
  const { data, error } = postResponse;
  return {
    // HACK: undefined は埋め込めないため
    props: !error ? { posts: data } : { error },
    revalidate: 1,
  };
};

export default StyledComponent;
