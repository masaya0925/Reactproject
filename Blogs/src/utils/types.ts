export type BlogType = {
  _id: string,
  title: string,
  author: string,
  url: string,
  likes: number,
  __v: number
};

export type MostBlogAuthor = {
    author: string,
    blogs: number
};

export type MostLikesBlogAuthor = {
    author: string,
    likes: number
};

export type ReturnedObject = {
    _id?: string,
    __v?: string,
    id?: string,
    passwordHash?: string
};

export type toNewUserParams = {
    username: unknown,
    name: unknown,
    password: unknown
};

export type UserType = {
    id: string,
    username: string,
    name: string,
    passwordHash: string,
    blogs: string[]
};

export type UserToken = {
    username: string,
    id: string
};

export type NewUser = Omit<UserType, 'id'>;

export type BlogTypeV2 = Omit<BlogType, '_id' | 'url' | '__v'>;