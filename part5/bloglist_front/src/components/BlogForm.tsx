import React, { useState } from "react";
import { NewBlog } from "../utils/types";

type Props = {
    createBlog: (NewBlog: NewBlog) => void
};

export const BlogForm: React.FC<Props> = ({ createBlog }) => {
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [url, setUrl] = useState<string>('');

  const addBlog = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    createBlog({
      title: title,
      author: author,
      url: url,
      likes: 0
    });

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <>
      <form onSubmit = {addBlog}>
        <div>
          title
          <input value = {title} 
              onChange = {({ target }) => setTitle(target.value)}/>
        </div>
        <div>
          author
          <input value = {author} 
              onChange = {({ target }) => setAuthor(target.value)}/>
        </div>
        <div>
          url
          <input value = {url} 
              onChange = {({ target }) => setUrl(target.value)}/>
        </div>
        <button type = 'submit'>create</button>
      </form>
    </>
  );
};
