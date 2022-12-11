export type Blog = {
    id: string,
    title: string,
    author: string,
    url: string,
    likes: number,
    user: Omit<UserType, 'blog'>
};

export type UserToken = {
    id: string,
    username: string,
    name: string,
    token: string
};

export type UserType = {
    id: string,
    username: string,
    name: string,
    blog: string[]
};

export type NewBlog = {
    title: string,
    author: string,
    url: string,
    likes: number
};

export type UpdateLikes = {
  id: string,
  likes: number
};