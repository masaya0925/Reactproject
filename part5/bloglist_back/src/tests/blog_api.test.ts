/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import mongoose from 'mongoose';
import supertest from 'supertest';
import { blogsInDb, initialBlogs, initialUsers, loginUser } from './test_helper.test';
import { app } from '../app';

const api = supertest(app);

import { Blog } from '../models/blog';
import { User } from '../models/user';

beforeAll(async () => {
  await User.deleteMany({});
  await User.insertMany(await initialUsers);
});

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
});


describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    const user = await loginUser(api, (await initialUsers)[0].username);

    await api
     .get('/api/blogs')
     .set('Authorization', `Bearer ${user.token}`)
     .expect(200)
     .expect('Content-Type', /application\/json/);
     
  });

  test('unique identifier property', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toBeDefined();
  });
});

test('a valid blog can be added', async () => {
  const user = await loginUser(api, (await initialUsers)[0].username);

  const newBlog = {
    title: 'Third Blog',
    author: 'jon wong',
    url: 'http://moga.com',
    likes: 100
  };

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${user.token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);
  
  const blogAtEnd  = await blogsInDb();
  expect(blogAtEnd).toHaveLength(initialBlogs.length + 1);


  const addBlog = blogAtEnd.find(blog => blog.title === newBlog.title);

  expect(addBlog).toBeDefined();
  if(addBlog !== undefined){

    expect(addBlog).toEqual({id: addBlog.id, ...newBlog, user: addBlog.user});
  }
  
});

test('likes property is missing from the request',async () => {
  const user = await loginUser(api, (await initialUsers)[0].username);

  const likeLessBlog = {
    title: 'likeLess',
    author: 'Sakura Hayasi',
    url: 'http://likelesshoge.example'
  };

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${user.token}`)
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
    .set('Authorization', `Bearer ${user.token}`)
    .send(addLikes)
    .expect(204);

    const blogs = await blogsInDb();

    const addedLikes = blogs.find(blog => blog.title === addLikes.title);
    expect(addedLikes).toEqual({id: addedLikes.id, ...addLikes, user: addedLikes.user});
  }

});

test('blog without content is not added',async () => {
  const user = (await initialUsers)[0];

  const token = (
    await api
      .post('/api/login')
      .send({ ...user, password: 'secret' })
      .expect(200)
  ).body.token;

  const newBlog = {
    author: 'Taro Yamada',
    likes: 1000
  };
  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(400);

  const noteAtEnd = await blogsInDb();
  expect(noteAtEnd).toHaveLength(initialBlogs.length);
});

test('deleting a single blog post',async () => {
  const user = await loginUser(api, (await initialUsers)[0].username);

  const blogAtStart = await blogsInDb();

  const blogToDelete = blogAtStart[0];

  await api
   .delete(`/api/blogs/${blogToDelete.id}`)
   .set('Authorization', `Bearer ${user.token}`)
   .expect(204);

  const blogsAtEnd = await blogsInDb();

  expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  const contents = blogsAtEnd.map(b => b.title);

  expect(contents).not.toContain(blogToDelete.title);

});

test('updating the information of an individual blog post',async () => {
  const user = await loginUser(api, (await initialUsers)[0].username);

  const blogAtStart = await blogsInDb();

  const updateBlog = blogAtStart[0];

  const modifyBlog = { 
    likes: 10 
  }; 

  await api
   .put(`/api/blogs/${updateBlog.id}`)
   .set('Authorization', `Bearer ${user.token}`)
   .send(modifyBlog)
   .expect(204);
  
  const blogAtEnd = await blogsInDb();
  
  expect(blogAtEnd).toContainEqual({...updateBlog, ...modifyBlog});

});

afterAll(() => {
  void mongoose.connection.close();
});