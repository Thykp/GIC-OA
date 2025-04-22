import { RequestHandler } from 'express';
import { NewCafeDto, UpdateCafeDto } from '../models/dto';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';

type Req = Parameters<RequestHandler>[0] & { container: import('awilix').AwilixContainer };

export const handleGetCafes: RequestHandler = async (req, res, next) => {
  try {
    const { location } = req.query as { location?: string };
    const svc = (req as Req).container.resolve('cafeService');
    const result = await svc.list(location);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const handleCreateCafe: RequestHandler = async (req, res, next) => {
  try {
    const dto = plainToClass(NewCafeDto, req.body);
    await validateOrReject(dto);
    const svc = (req as Req).container.resolve('cafeService');
    const cafe = await svc.create(dto);
    res.status(201).json(cafe);
  } catch (err) {
    next(err);
  }
};

export const handleUpdateCafe: RequestHandler = async (req, res, next) => {
  try {
    const dto = plainToClass(UpdateCafeDto, req.body);
    await validateOrReject(dto);
    const svc = (req as Req).container.resolve('cafeService');
    const updated = await svc.update(dto);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const handleDeleteCafe: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.query as { id: string };
    const svc = (req as Req).container.resolve('cafeService');
    await svc.remove(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};