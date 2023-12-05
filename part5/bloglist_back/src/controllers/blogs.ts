/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import { Blog } from "../models/blog";
import { loginRequire } from "../utils/middleware";
import { UserDocument } from "../utils/types";

export const blogRouter = express.Router();

blogRouter.get("/", (_req, res) => {
  void (async () => {
    const blogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
    });
    res.json(blogs);
  })();
});

blogRouter.get("/:id", (req, res) => {
  void (async () => {
    const blog = await Blog.findById(req.params.id);
    res.json(blog);
  })();
});

blogRouter.post("/", loginRequire, (req, res, next) => {
  void (async () => {
    try {
      const body = req.body;

      const user = req.user as UserDocument;

      if (body.title === undefined || body.url === undefined) {
        res.status(400).end();
      } else {
        const newBlog = new Blog({
          title: body.title,
          author: body.author,
          url: body.url,
          likes: body.likes,
          user: user,
        });
        const savedBlog = await newBlog.save();

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        user.blogs = user.blogs.concat(savedBlog._id);
        await user.save();

        const populatedBlog = await Blog.findById(savedBlog._id).populate(
          "user",
          {
            username: 1,
            name: 1,
          }
        );

        res.status(201).json(populatedBlog);
      }
    } catch (e) {
      next(e);
    }
  })();
});

blogRouter.patch("/:id", (req, res) => {
  void (async () => {
    const body = req.body;

    const blog = {
      likes: body.likes,
    };

    const update = await Blog.findByIdAndUpdate(req.params.id, blog, {
      new: true,
    });

    const populate = await Blog.findById(update._id).populate("user", {
      username: 1,
      name: 1,
    });

    res.status(200).json(populate);
  })();
});

blogRouter.delete("/:id", loginRequire, (req, res, next) => {
  void (async () => {
    try {
      const user = req.user as UserDocument;
      const blog = await Blog.findById(req.params.id);

      if (blog.user.toString() === user.id.toString()) {
        await blog.delete();

        user.blogs = user.blogs.filter(
          (id) => id.toString() !== blog.id.toString()
        );
        await user.save();

        res.status(204).json("Successfully deleted.");
        return;
      } else {
        res
          .status(400)
          .json({ error: "deleting blog is possible only blog creator." });
        return;
      }
    } catch (e) {
      next(e);
    }
  })();
});
