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
    id?: string
};

export type BlogTypeV2 = Omit<BlogType, '_id' | 'url' | '__v'>;