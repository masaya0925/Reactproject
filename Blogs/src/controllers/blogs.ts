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
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const blog = new Blog(req.body);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  void blog
    .save()
    .then((result: unknown) => {
        res.status(201).json(result);
    });
});

