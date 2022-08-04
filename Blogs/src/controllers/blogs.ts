/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import { Blog } from '../models/blog';

export const blogRouter = express.Router();

blogRouter.get('/', (_req, res) => {
  void(async () => {
    const blogs = await Blog.find({});
    res.json(blogs);
  })();
});

blogRouter.post('/', (req, res) => {
  void(async () => {
    const body = req.body;

    if(body.title === undefined || body.url === undefined) {
       res.status(400).end();
    } else {
      const newBlog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes:body.likes
      });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const savedBlog = await newBlog.save();
      res.status(201).json(savedBlog);
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
      likes: body.likes
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