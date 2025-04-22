import { Request, Response, NextFunction, RequestHandler } from 'express';
import { AwilixContainer } from 'awilix';

type RequestWithContainer = Request & { container: AwilixContainer };

export const handleGetCafes: RequestHandler = async (req, res, next) => {
  try {
    const { location } = req.query as { location?: string };

    const container = (req as RequestWithContainer).container;

    const cafes = await container.resolve('cafeService').list(location);
    res.json(cafes);
  } catch (err) {
    next(err);
  }
};
