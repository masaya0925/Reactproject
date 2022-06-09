export type BlogType = {
  _id: string,
  title: string,
  author: string,
  url: string,
  likes: number,
  __v: number
};

export type BlogTypeV2 = Omit<BlogType, '_id' | 'url' | '__v'>;