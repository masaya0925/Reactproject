/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import  express  from "express";
import { User } from "../models/user";
import { toNewUser } from "../utils/functions";

export const userRouter = express.Router();

userRouter.get('/', (_req, res) => {
  void(async () => {
    const users = await User.find({})
                        .populate('blogs', { url: 1, title: 1, author: 1, id: 1});
    res.json(users);
  })();
});

userRouter.post('/', (req, res, next) => {
  void(async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const newUser = new User(await toNewUser(req.body));
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (err) {
      next(err);
    }  
  })();
  
});