import { RequestHandler } from 'express';
import { NewEmployeeDto, UpdateEmployeeDto } from '../models/dto';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';

type Req = Parameters<RequestHandler>[0] & { container: import('awilix').AwilixContainer };

export const handleGetEmployees: RequestHandler = async (req, res, next) => {
  try {
    const { cafe } = req.query as { cafe?: string };
    const svc = (req as Req).container.resolve('employeeService');
    const result = await svc.list(cafe);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const handleCreateEmployee: RequestHandler = async (req, res, next) => {
  try {
    const dto = plainToClass(NewEmployeeDto, req.body);
    await validateOrReject(dto);
    const svc = (req as Req).container.resolve('employeeService');
    const emp = await svc.create(dto);
    res.status(201).json(emp);
  } catch (err) {
    next(err);
  }
};

export const handleUpdateEmployee: RequestHandler = async (req, res, next) => {
  try {
    const dto = plainToClass(UpdateEmployeeDto, req.body);
    await validateOrReject(dto);
    const svc = (req as Req).container.resolve('employeeService');
    const updated = await svc.update(dto);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const handleDeleteEmployee: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.query as { id: string };
    const svc = (req as Req).container.resolve('employeeService');
    await svc.remove(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};