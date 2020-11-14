export type PostType = {
  id: string;
  title: string;
};

export const isPost = (data: any): data is PostType => {
  if (typeof data.id !== "string") return false;
  if (typeof data.title !== "string") return false;
  return true;
};
