import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import { MONGODB_URI } from './utils/config';
import { blogRouter } from './controllers/blogs';
import { userRouter } from './controllers/users';
import { loginRouter } from './controllers/login';
import { requestLogger, unknownEndpoint, errorHandler, tokenExtractor, userExtractor} from './utils/middleware';
import { info, bError } from './utils/logger';

const app = express();

const url = MONGODB_URI;

if(url === undefined) {
   throw new Error('MONGODB_URI is not set');
}

mongoose.connect(url)
 .then(() => {
   info('connected to MongoDB');
 })
 .catch((error) => {
   bError('error connecting to MongoDB', error.message);
 });

app.use(cors());
app.use(express.json());
app.use(tokenExtractor);
app.use(requestLogger);

app.use('/api/blogs', userExtractor, blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

export { app };