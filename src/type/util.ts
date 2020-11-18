import dayjs from "dayjs";

export type HexColorType = string & {
  __hexColorTypeString: never;
};

export const isHexColorType = (color: string): color is HexColorType => {
  // # で始まるべき
  if (color[0] !== "#") return false;
  // #aaa, #aaaaaa であるべき
  if (color.length !== 4 && color.length !== 7) return false;
  return true;
};

export type ApiResponseType<T> = { data: T; error: string };

export type ValidDateType =
  | FormattedJapaneseDateType
  | FormattedJapaneseDateTimeType
  | FormattedDateTimeForURLType;

// YYYY年M月D日 を表す型
export type FormattedJapaneseDateType = string & {
  __formattedJapaneseDateString: never;
};

// YYYY年M月D日 hh時mm分 を表す型
export type FormattedJapaneseDateTimeType = string & {
  __formattedJapaneseDateTimeString: never;
};

// YYYY-MM-DD を表す型
export type FormattedDateTimeForURLType = string & {
  __formattedJapaneseDateTimeString: never;
};

export const toFormattedJapaneseDateType = (date: ValidDateType) => {
  return dayjs(date).format("YYYY年M月D日") as FormattedJapaneseDateType;
};

export const toFormattedJapaneseDateTimeType = (date: ValidDateType) => {
  return dayjs(date).format(
    "YYYY年M月D日 hh時mm分"
  ) as FormattedJapaneseDateTimeType;
};

export const toFormattedDateTimeForURLType = (date: ValidDateType) => {
  return dayjs(date).format("YYYY-MM-DD") as FormattedJapaneseDateTimeType;
};

export const isValidDate = (date: any): date is ValidDateType => {
  return dayjs(date).isValid();
};

export type FireStoreDocument<T> = T & { id: string };

export const isStringArray = (data: any): data is string[] => {
  for (let d of data) typeof d !== "string";
  return true;
};
