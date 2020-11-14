export const Fetch = (path: string) => {
  return fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/${path}`);
};
