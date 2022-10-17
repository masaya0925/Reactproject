/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import { Blog } from '../models/blog';
import { loginRequire } from '../utils/middleware';
import { UserDocument } from '../utils/types';

export const blogRouter = express.Router();

blogRouter.get('/', (_req, res) => {
  void(async () => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1});
    res.json(blogs);
  })();
});

blogRouter.post('/', loginRequire, (req, res, next) => {
  void(async () => {
    try {
      const body = req.body;
  
      const user = req.user as UserDocument;

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

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        user.blogs = user.blogs.concat(savedBlog._id);
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

blogRouter.delete('/:id', loginRequire, (req, res, next) => {
  void(async () => {
    try {

      const user = req.user as UserDocument;
      const blog = await Blog.findById(req.params.id);

      if(blog.user.toString() === user.id.toString()) {
        await Blog.deleteOne({ _id: blog._id });
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