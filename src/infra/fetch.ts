export const Fetch = (path: string, req?: RequestInit) => {
  return fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/${path}`, req);
};
