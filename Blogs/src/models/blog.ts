import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
});

blogSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

export const Blog = mongoose.model('Blog', blogSchema);

