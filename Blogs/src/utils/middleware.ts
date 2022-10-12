import { Request, Response , NextFunction } from 'express';
import { info, bError } from './logger';

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