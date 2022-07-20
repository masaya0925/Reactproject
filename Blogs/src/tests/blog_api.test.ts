import mongoose from 'mongoose';
import supertest from 'supertest';
import { initialBlogs } from './test_helper';
import { app } from '../app';

const api = supertest(app);

import { Blog } from '../models/blog';

beforeEach(async () => {
  await Blog.deleteMany();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  const blogObjects = initialBlogs.map(blog => new Blog(blog));
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  const processArray = blogObjects.map(blog => blog.save());
  await Promise.all(processArray);
});

test('blogs are returned as json', async () => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

afterAll(() => {
    void mongoose.connection.close();
});

test('unique identifier property', async () => {
    const response = await api.get('/api/blogs');
    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const blog = response.body[0];
    expect(blog.id).toBeDefined();
});