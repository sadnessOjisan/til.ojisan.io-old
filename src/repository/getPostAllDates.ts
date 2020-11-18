import { store } from "../infra/FirebaseServer";
import { ApiResponseType, isValidDate, ValidDateType } from "../type/util";

export const getPostAllDates = async (): Promise<
  ApiResponseType<ValidDateType[]>
> => {
  try {
    const documents = await store.collection("posts").get();
    const dates = documents.docs.map((d) => {
      const validDate = d.data().createdAt.toDate();
      if (!isValidDate(validDate)) {
        throw new Error();
      }
      return validDate;
    });
    return { data: dates, error: undefined };
  } catch (e) {
    return { data: undefined, error: e };
  }
};
