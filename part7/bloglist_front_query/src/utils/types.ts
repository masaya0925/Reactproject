export type Blog = {
  id: string;
  title: string;
  author: string;
  url: string;
  likes: number;
  user: Omit<UserType, "blog">;
};

export type UserToken = {
  username: string;
  name: string;
  blogs: string[];
  token: string;
};

export type UserType = {
  username: string;
  name: string;
  blogs: string[];
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

export type NotificationType = {
  severity: "success" | "error";
  message: string;
};
