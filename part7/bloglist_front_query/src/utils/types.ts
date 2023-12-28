export type Blog = {
  id: string;
  title: string;
  author: string;
  url: string;
  likes: number;
  user: Omit<UserType, "blog">;
  comment: string[];
};

export type UserToken = {
  id: string;
  username: string;
  name: string;
  blogs: Blog[];
  token: string;
};

export type UserType = {
  id: string;
  username: string;
  name: string;
  blogs: Blog[];
};

export type NewBlog = {
  title: string;
  author: string;
  url: string;
  likes: number;
};

export type UpdateLikes = {
  id: string;
  likes: number;
};

export type CommentType = {
  id: string;
  content: string;
};

export type NotificationType = {
  severity: "success" | "error";
  message: string;
};
