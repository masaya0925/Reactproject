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