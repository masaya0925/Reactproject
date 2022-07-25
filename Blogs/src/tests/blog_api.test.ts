/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import mongoose from 'mongoose';
import supertest from 'supertest';
import { blogsInDb, initialBlogs } from './test_helper.test';
import { app } from '../app';

const api = supertest(app);

import { Blog } from '../models/blog';

beforeEach(async () => {
  await Blog.deleteMany();
  await Blog.insertMany(initialBlogs);
});

test('blogs are returned as json', async () => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('unique identifier property', async () => {
    const response = await api.get('/api/blogs');
    

    const blog = response.body[0];
    expect(blog.id).toBeDefined();
});

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Third Blog',
    author: 'jon wong',
    url: 'http://moga.com',
    likes: 100
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);
  
  const blogAtEnd  = await blogsInDb();
  expect(blogAtEnd).toHaveLength(initialBlogs.length + 1);


  const addBlog = blogAtEnd.find(blog => blog.title === newBlog.title);

  expect(addBlog).toBeDefined();
  if(addBlog !== undefined){

    expect(addBlog).toEqual({id: addBlog.id, ...newBlog});
  }
  
});

test('likes property is missing from the request',async () => {
  const likeLessBlog = {
    title: 'likeLess',
    author: 'Sakura Hayasi',
    url: 'http://likelesshoge.example'
  };

  await api
    .post('/api/blogs')
    .send(likeLessBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogAtEnd = await blogsInDb();

  const findLikeLess = blogAtEnd.find(blog => blog.title === likeLessBlog.title);
  expect(findLikeLess).toBeDefined();

  if(findLikeLess.likes === undefined) {

    const addLikes = { 
      title: findLikeLess.title,
      author: findLikeLess.author,
      url: findLikeLess.url,
      likes: 0 
    };

    await api
    .put(`/api/blogs/${findLikeLess.id}`)
    .send(addLikes)
    .expect(201);

    const blogs = await blogsInDb();

    const addedLikes = blogs.find(blog => blog.title === addLikes.title);
    expect(addedLikes).toEqual({id: addedLikes.id, ...addLikes});
  }

});

test('blog without content is not added',async () => {
  const newBlog = {
    author: 'Taro Yamada',
    likes: 1000
  };
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);

  const noteAtEnd = await blogsInDb();
  expect(noteAtEnd).toHaveLength(initialBlogs.length);
});

afterAll(() => {
  void mongoose.connection.close();
});