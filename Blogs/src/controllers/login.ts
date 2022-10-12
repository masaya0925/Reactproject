/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import express from 'express';
import { User } from '../models/user';
import { SECRET } from '../utils/config';

export const loginRouter = express.Router();

loginRouter.post('/', (req, res) => {
    void(async () => {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        const passwordCorrect = user === null
            ? false
            : await bcrypt.compare(password, user.passwordHash);

        if(!(user && passwordCorrect)){
            res.status(401).json({
                error: 'invalid username or password'
            });
            return;
        }

        const userForToken = {
            username: user.username,
            id: user._id
        };

        if(SECRET === undefined) {
            throw new Error('Environment variable SECRET is not given.');
        }

        const token = jwt.sign(userForToken, SECRET, {expiresIn: 60 * 60});

        res.status(200)
           .send({token, username: user.username, name: user.name});
    })();
});