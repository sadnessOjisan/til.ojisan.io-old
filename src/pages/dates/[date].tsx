import styled from "styled-components";
import { Layout } from "../../components/Layout";
import { PostListItem } from "../../components/PostListItem";
import { Color } from "../../const/color";
import { getPostAllDates } from "../../repository/getPostAllDates";
import { getPostsByDate } from "../../repository/getPostsByDate";
import { getTags } from "../../repository/getTags";
import {
  PostIndexPagePostType,
  toPostIndexPagePostType,
} from "../../type/ui/Post";
import { isValidDate, toFormattedDateTimeForURLType } from "../../type/util";

type Props = {
  posts?: PostIndexPagePostType[];
  error?: string;
  className?: string;
  date?: string;
};

const Component = (props: Props) => (
  <Layout>
    <div className={props.className}>
      <h1>
        {props.date}の
        <div>
          <span>T</span>oday oj<span>I</span>san <span>L</span>
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
  const { date } = context.params;
  if (!isValidDate(date)) {
    console.error("<getPostAllDates> invalid data struct: ", date);
    return { data: undefined, error: "invalid data struct" };
  }
  const postResponse = await getPostsByDate(date);
  const { data, error } = postResponse;
  const viewData = await Promise.all(
    data.map(async (d) => {
      const tagsResponse = await getTags(d.tags);
      const tagData = tagsResponse.data;
      return toPostIndexPagePostType(d, tagData);
    })
  );

  const sortedData = viewData.sort((a, b) =>
    a.createdAt < b.createdAt ? 1 : -1
  );

  return {
    // HACK: undefined は埋め込めないため
    props: !error ? { posts: sortedData, date: date } : { error },
    revalidate: 600,
  };
}

export async function getStaticPaths() {
  const postAllDatesResponse = await getPostAllDates();
  const { data, error } = postAllDatesResponse;
  const datePath = data.map((d) => toFormattedDateTimeForURLType(d));
  return {
    // / を忘れるな
    paths: !error ? datePath.map((date) => `/dates/${date}`) : [],
    fallback: true,
  };
}

export default StyledComponent;
