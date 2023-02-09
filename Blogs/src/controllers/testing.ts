import express from 'express';
import { Blog } from '../models/blog';
import { User } from '../models/user';

export const testingRouter = express.Router();

testingRouter.post('/reset', (_req, res, next) => {
  void(async() => {
    try {
      await Blog.deleteMany({});
      await User.deleteMany({});
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  })();   
});