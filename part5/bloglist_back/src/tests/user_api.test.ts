/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import mongoose from 'mongoose';
import supertest from 'supertest';
import { app } from '../app';
import { User } from '../models/user';
import { usersInDb, getInitialUser } from './test_helper.test';

const api = supertest(app);

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({});
        await User.insertMany(await getInitialUser());
    });

    test('creation succeed with a fresh username', async () => {
        const userAtStart = await usersInDb();


        const newUser = {
            username: 'Mr.MJ',
            name: 'Michael Jackson',
            password: 'password' 
        };

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/);
        
        const usersAtEnd = await usersInDb();
        expect(usersAtEnd).toHaveLength(userAtStart.length + 1);

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        const usernames = usersAtEnd.map(u => u.username);
        expect(usernames).toContain(newUser.username);
    });

   test('username already taken', async () => {
        const usersAtStart = await usersInDb();
        console.log('start', usersAtStart);
    
       const newUser = {
         username: 'root',
         name: 'Superuser',
         password: 'password'
       };

       const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);
                
        expect(result.body.error).toContain('`username` to be unique');

        const usersAtEnd = await usersInDb();
       console.log('end', usersAtEnd);

        expect(usersAtEnd).toEqual(usersAtStart);

   });
});

describe('when User information is missing', () => {

    test('missing username', async () => {

        const newUser = {
          name: 'mokemoke',
          password: 'password'
        };

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        
        expect(result.body.error).toContain('Invalid username');

    });

    test('missing name', async () => {
        
        const newUser = {
            username: 'piyopiyo',
            password: 'password'
        };

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        
        expect(result.body.error).toContain('Invalid name');
    });

    test('missing password', async () => {
        
        const newUser = {
            username: 'hugahuga',
            name: 'meawmeaw'
        };

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        expect(result.body.error).toContain('Invalid password');
    });

    test('too short username', async () => {
        
        const newUser = {
            username: 'o',
            name: 'tom tom',
            password: '1234530'
        };

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        expect(result.body.error).toBe('Invalid username or password, Please enter at least 3 characters');
    });

    test('too short password', async () => {
        
        const newUser = {
            username: 'meemee',
            name: 'hoomaa',
            password: 'p'
        };

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        expect(result.body.error).toBe('Invalid username or password, Please enter at least 3 characters');
    });
});

afterAll(() => {
    void mongoose.connection.close();
});