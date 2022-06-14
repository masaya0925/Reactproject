import { BlogType, BlogTypeV2, mostBlogAuthor } from './types';
import _ from 'lodash';

export const dummy = (_blogs: BlogType[]): number => {
    return 1;
};

export const totalLikes = (blogs: BlogType[]): number => {
    return  blogs.reduce((sum, blog) => (sum += blog.likes), 0);
};

export const favoriteBlog = (blogs: BlogType[]): BlogTypeV2 | null => {
    const mostLike = Math.max(...blogs.map(blog => blog.likes));
    const mostLikeBlog = blogs.find(blog => blog.likes === mostLike);
    //console.log(mostLikeBlog);
    
    if(mostLikeBlog === undefined) {
        return null;
    } 
    return {
        title: mostLikeBlog.title,
       author: mostLikeBlog.author,
        likes: mostLikeBlog.likes
    };    
};

export const mostBlog = (blogs: BlogType[]): mostBlogAuthor | null => {
    const countBlog = _.countBy(blogs.map(blog => blog.author));
    const mostBlog = Math.max(...Object.values(countBlog));
    const mostBlogAuthor = _.findKey(countBlog, (count) => count === mostBlog);

    //console.log('sort by:',countBlog);
    //console.log('most by:',mostBlog);
    //console.log('most blog Author:', mostBlogAuthor);

    if(mostBlogAuthor === undefined) {
        return null;
    }

    return { 
        author: mostBlogAuthor,
        blogs: mostBlog
     };
};