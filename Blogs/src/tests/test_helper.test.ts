/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import bcrypt from 'bcrypt';
import supertest from 'supertest';

import { Blog } from '../models/blog';
import { User } from '../models/user';

export type TestBlogType = {
  _id: string,
  title: string,
  author: string,
  url: string,
  likes: number,
  user: string
};


export const initialBlogs: TestBlogType[] = [
    {
        _id: '634849bbcc710956151d2e01',
        title: 'first Blog',
        author: 'John Smith',
        url: 'http://myfirstblogmogemoge.com',
        likes: 1,
        user: '9832e556992ff5bdc2af4726'
    },
    {
        _id: '634992ee29afc8712961eadf',
        title: 'second Blog',
        author: 'Hellen Mars',
        url: 'http://mogacatmogmog.com',
        likes: 200,
        user: '633b137286d3553a0138c8f9'
    },
    {
      _id: '633c583c90f3d688a321d62a',
      title: 'third blog',
      author: 'Sophie Wise',
      url: 'http://de.im/mutfone',
      likes: 1000,
      user: '6097716d976d7012184fb65b'
    }
];

export const getInitialUser = async () => {
  const passwordHash = await bcrypt.hash('secret', 10);

  const initialUsers = [
    { username: 'root', name: 'Superuser', passwordHash}
  ];

  return initialUsers;
};

export type TestUserType = {
  _id: string,
  username: string,
  name: string,
  passwordHash: string,
  blogs: string[]
};

export const initialUsers = (async () => {
  const passwordHash = await bcrypt.hash('secret', 10);
  const initialUsers: TestUserType[] = [
    {
      _id:'9832e556992ff5bdc2af4726',
      username: 'Georgia',
      name: 'Bryan Thompson',
      passwordHash,
      blogs: [
        '634849bbcc710956151d2e01',
      ]
    },
    {
      _id:'633b137286d3553a0138c8f9',
      username: 'Beulah',
      name: 'Alejandro Sandoval',
      passwordHash,
      blogs: [
        '634992ee29afc8712961eadf',
      ]
    },
    {
      _id:'6097716d976d7012184fb65b',
      username: 'Nell',
      name: 'Clara Palmer',
      passwordHash,
      blogs: [
        '633c583c90f3d688a321d62a',
      ]
    }
  ];
  return initialUsers;
})();

export const loginUser = async (api: supertest.SuperTest<supertest.Test>, 
                                username: string) => {
  const user = (await initialUsers).find(u => u.username === username);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const token: string = (
    await api
        .post('/api/login')
        .send({...user, password: 'secret'})
        .expect(200)
  ).body.token;
  
  return {...user, token};
};

export const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

export const usersInDb = async () => {
  const users = await User.find({});
  return users.map(user => user.toJSON());
};