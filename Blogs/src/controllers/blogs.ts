/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import  jwt  from 'jsonwebtoken';
import { Blog } from '../models/blog';
import { User } from '../models/user';
import { SECRET } from '../utils/config';
import { UserToken } from '../utils/types';

export const blogRouter = express.Router();

blogRouter.get('/', (_req, res) => {
  void(async () => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1});
    res.json(blogs);
  })();
});

blogRouter.post('/', (req, res, next) => {
  void(async () => {
    try {
      const body = req.body;
  
      if(req.token === undefined) {
        res.status(401).json({ error: 'invalid token'});
        return;
      }
  
      if(SECRET === undefined) {
       throw new Error('Environment variable SECRET is not given.');
      }
  
      const decodedTokenNever = jwt.verify(req.token, SECRET);
  
      const decodedToken = decodedTokenNever as UserToken;
  
      if(!decodedToken.id) {
        res.status(401).json({error: 'token missing or invalid'});
        return;
      }
  
      const user = await User.findById(decodedToken.id);

      if(body.title === undefined || body.url === undefined) {
         res.status(400).end();
      } else {
        const newBlog = new Blog({
          title: body.title,
          author: body.author,
          url: body.url,
          likes:body.likes,
          user: user._id
        });
        const savedBlog = await newBlog.save();

        user.blogs = user.blogs.concat(savedBlog.id);
        await user.save();

        res.status(201).json(savedBlog);
      }
    } catch (e) {
      next(e);
    }  
  })();
});

blogRouter.put('/:id', (req, res) => {
  void(async () => {
    const body = req.body;

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: body.user
    };

    const update =  await Blog.findByIdAndUpdate(req.params.id, blog, { new: true });
    res.status(204).json(update);

  })();
});

blogRouter.delete('/', (req, res, next) => {
  void(async () => {
    try {

      const blogId = req.body.blogId;

      const blog = await Blog.findById(blogId);

      if(req.token === undefined) {
        res.status(401).json({error: 'invalid token'});
        return;
      }

      if(SECRET === undefined) {
        throw new Error('Environment variable SECRET is not given.');
      }

      const decodedTokenNever = jwt.verify(req.token, SECRET);
  
      const decodedToken = decodedTokenNever as UserToken; 

      console.log('id:', decodedToken.id);

      if(!decodedToken.id) {
        res.status(401).json({error: 'missing or invalid token'});
        return;
      }

      if(blog.user.toString() === decodedToken.id.toString()) {
        await Blog.findByIdAndRemove(blogId);
        res.status(200).json('Successfully deleted.');
        return;
      } else {
        res.status(400).json({error: 'deleting blog is possible only blog creator.'});
        return;
      }
            
    } catch (e) {
      next(e);
    }
  })();
});