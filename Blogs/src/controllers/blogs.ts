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

const getTokenFrom = (req: express.Request) => {
  const authorization = req.get('authorization');
  if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

blogRouter.post('/', (req, res, next) => {
  void(async () => {
    try {
      const body = req.body;
  
      const token = getTokenFrom(req);
  
      if(token === null) {
        res.status(401).json({ error: 'invalid token'});
        return;
      }
  
      if(SECRET === undefined) {
       throw new Error('Environment variable SECRET is not given.');
      }
  
      const decodedTokenNever = jwt.verify(token, SECRET);
  
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

blogRouter.delete('/:id', (req, res) => {
  void(async () => {
  await Blog.findByIdAndRemove(req.params.id); 
  res.status(204).end();
  })();
});