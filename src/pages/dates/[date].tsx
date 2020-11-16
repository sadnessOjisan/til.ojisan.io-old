import { GetStaticProps } from "next";
import {
  createPostForView,
  createURLFormattedDate,
  isValidDate,
} from "../../entity/Post";
import { getPostAllDates } from "../../repository/getPostAllDates";
import { getPostsByDate } from "../../repository/getPostsByDate";
import { getTags } from "../../repository/getTags";

const Component = (props) => {
  return <div>hoge{JSON.stringify(props)}</div>;
};

export const getStaticProps: GetStaticProps = async (context) => {
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
      return createPostForView(d, tagData, false);
    })
  );

  const sortedData = viewData.sort((a, b) =>
    a.createdAt < b.createdAt ? 1 : -1
  );

  return {
    // HACK: undefined は埋め込めないため
    props: !error ? { posts: sortedData } : { error },
    revalidate: 3000,
  };
};

export async function getStaticPaths() {
  const postAllDatesResponse = await getPostAllDates();
  const { data, error } = postAllDatesResponse;
  console.log("datadata", data);
  const YYYYMMDDDates = data.map((d) => createURLFormattedDate(d));
  console.log("YYYYMMDDDates", YYYYMMDDDates);
  return {
    // / を忘れるな
    paths: !error ? YYYYMMDDDates.map((date) => `/dates/${date}`) : [],
    fallback: true,
  };
}

export default Component;
