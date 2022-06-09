import { BlogType } from "./types";

export const dummy = (_blogs: BlogType[]): number => {
    return 1;
};

export const totalLikes = (blogs: BlogType[]): number => {
    return  blogs.reduce((sum, blog) => (sum += blog.likes), 0);
};