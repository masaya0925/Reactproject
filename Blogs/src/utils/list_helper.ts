import { BlogType, BlogTypeV2 } from "./types";

export const dummy = (_blogs: BlogType[]): number => {
    return 1;
};

export const totalLikes = (blogs: BlogType[]): number => {
    return  blogs.reduce((sum, blog) => (sum += blog.likes), 0);
};

export const favoriteBlog = (blogs: BlogType[]): BlogTypeV2 | null => {
    const mostLike = Math.max(...blogs.map(blog => blog.likes));
    const mostLikeBlog = blogs.find(blog => blog.likes === mostLike);
    console.log(mostLikeBlog);
    
    if(mostLikeBlog === undefined) {
        return null;
    } 
    return {
        title: mostLikeBlog.title,
       author: mostLikeBlog.author,
        likes: mostLikeBlog.likes
    };    
};