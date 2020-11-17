import styled from "styled-components";
import { Layout } from "../../components/Layout";
import { PostListItem } from "../../components/PostListItem";
import { Color } from "../../const/color";
import { createPostForView, PostViewType } from "../../entity/Post";
import { getAllTags } from "../../repository/getAllTags";
import { getPostByTagName } from "../../repository/getPostByTagName";
import { getTags } from "../../repository/getTags";

type Props = {
  posts?: PostViewType[];
  tagName: string;
  error?: string;
  className?: string;
  date?: string;
};

const Component = (props: Props) => (
  <Layout>
    <div className={props.className}>
      <h1>
        #{props.tagName}の
        <div>
          oj<span>I</span>san <span>L</span>
          earned
        </div>
      </h1>
      {props.posts
        ? props.posts.map((post) => (
            <PostListItem post={post} key={post.id}></PostListItem>
          ))
        : JSON.stringify(props.error)}
    </div>
  </Layout>
);

const StyledComponent = styled(Component)`
  color: white;
  & > h1 {
    font-size: 40px;
    text-align: center;
    & > div > span {
      color: ${Color.highlight};
    }
  }
`;

export async function getStaticProps(context) {
  // YYYY-MM-DD
  const { tag } = context.params;
  if (typeof tag !== "string") {
    console.error("<getPostAllDates> invalid data struct: ", tag);
    return { data: undefined, error: "invalid data struct" };
  }
  const postResponse = await getPostByTagName(tag);
  const { data, error } = postResponse;
  const viewData = await Promise.all(
    data.map(async (d) => {
      const tagsResponse = await getTags(d.tags);
      const tagData = tagsResponse.data;
      return createPostForView(d, tagData, false);
    })
  );

  const sortedData = viewData.sort((a, b) =>
    a.createdAt < b.createdAt ? 1 : -1
  );

  return {
    // HACK: undefined は埋め込めないため
    props: !error ? { posts: sortedData, tagName: tag } : { error },
    revalidate: 600,
  };
}

export async function getStaticPaths() {
  const getAllTagsResponse = await getAllTags();
  const { data, error } = getAllTagsResponse;
  return {
    // / を忘れるな
    paths: !error ? data.map((d) => `/tags/${d}`) : [],
    fallback: true,
  };
}

export default StyledComponent;
