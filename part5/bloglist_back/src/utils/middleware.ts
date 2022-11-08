/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Request, Response , NextFunction } from 'express';
import { SECRET } from './config';
import { info, bError } from './logger';
import { UserToken } from './types';
import  jwt  from 'jsonwebtoken';
import { User } from '../models/user';
import { Error } from 'mongoose';

export const requestLogger = (req: Request, _res: Response, next: NextFunction) => {
  info('Method:', req.method);
  info('Path:  ', req.path);
  info('Body:  ', req.body);
  info('---');
  next();
};

export const unknownEndpoint = (_req: Request, res: Response) => {
  res.status(404).send({error: 'unknown endpoint'});
};

export const errorHandler = (error: Error, _req: Request, res: Response, next: NextFunction) => {
  bError(error.message);
  
  if(Error.name === 'CastError') {
     res.status(400).send({error: 'malformatted id' });
  } else if(error.name === 'ValidationError') {
     res.status(400).json({error: error.message});
  } else if(error.name === 'JsonWebTokenError') {
     res.status(401).json({error: error.message});
  } else if(error.name === 'TokenExpiredError') {
    res.status(401).json({error: 'token expired'});
  }
  next(error);
};

export const tokenExtractor = (req: Request, _res: Response, next: NextFunction) => {
    const authorization = req.get('authorization');
    if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
      req.token = authorization.substring(7);
    }
    next();
};

export const loginRequire = (req: Request, _res: Response, next: NextFunction) => {
  if(req.user === undefined){
    const noTokenError = new Error('token missing or invalid');
    noTokenError.name = 'JsonWebTokenError';
    throw noTokenError;
  }
  next();
};

export const userExtractor = (req: Request, _res: Response, next: NextFunction) => {
  void(async() => {
    try {
      
    if(req.token === undefined) {
      next();
      return;
    }

    if(SECRET === undefined) {
     throw new Error('Environment variable SECRET is not given.');
    }

    const decodedTokenNever = jwt.verify(req.token, SECRET);

    if (typeof decodedTokenNever !== 'object') {
      next();
      return;
    }

    const decodedToken = decodedTokenNever as UserToken;

    if (decodedToken.id === undefined || decodedToken.id.length === 0) {
      next();
      return;
    }

    const user = await User.findById(decodedToken.id);

    if(user !== null) {
      req.user = user;
    }
    next();

  } catch (e) {
    next(e);
  }
  })();
};