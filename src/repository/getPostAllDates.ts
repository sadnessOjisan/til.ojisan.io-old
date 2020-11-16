import {
  createValidDate,
  FormattedDateType,
  isValidDates,
  ValidDateType,
} from "../entity/Post";
import { store } from "../infra/FirebaseServer";
import { Fetch } from "../infra/fetch";
import { ApiResponseType } from "../type/util";

export const getPostAllDates = async (): Promise<
  ApiResponseType<ValidDateType[]>
> => {
  try {
    const documents = await store.collection("posts").get();
    const dates = documents.docs.map((d) => {
      return createValidDate(d.data().createdAt.toDate());
    });
    if (!isValidDates(dates)) {
      console.error("<getPostAllDates> invalid data struct: ", dates);
      return { data: undefined, error: "invalid data struct" };
    }
    return { data: dates, error: undefined };
  } catch (e) {
    return { data: undefined, error: e };
  }
};
