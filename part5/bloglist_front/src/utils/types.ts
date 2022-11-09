export type Blog = {
    id: string,
    title: string,
    author: string,
    url: string,
    likes: string
};

export type UserToken = {
    id: string,
    username: string,
    name: string,
    token: string
};

export type NewBlog = {
    title: string,
    author: string,
    url: string,
    likes: string
};