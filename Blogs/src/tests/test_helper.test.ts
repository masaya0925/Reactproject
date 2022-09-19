/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Blog } from '../models/blog';
import { User } from '../models/user';
import { BlogType } from '../utils/types';

export type TestBlog = Omit<BlogType, '_id' | '__v'>;

export const initialBlogs: TestBlog[] = [
    {
        title: 'first Blog',
        author: 'John Smith',
        url: 'http://myfirstblogmogemoge.com',
        likes: 1
    },
    {
        title: 'second Blog',
        author: 'Hellen Mars',
        url: 'http://mogacatmogmog.com',
        likes: 200
    }
];

export const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

export const usersInDb =async () => {
  const users = await User.find({});
  return users.map(user => user.toJSON());
};