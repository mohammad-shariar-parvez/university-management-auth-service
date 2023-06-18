import { NextFunction, Request, Response, RequestHandler } from 'express';

const catchAsync = (fn: RequestHandler) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default catchAsync;
