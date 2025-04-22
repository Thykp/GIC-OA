import { RequestHandler } from 'express';
import { AwilixContainer } from 'awilix';

declare module 'awilix-express' {
  export function scopePerRequest(container: AwilixContainer): RequestHandler;
  export function makeInvoker(fn: any): any;
  export interface RequestWithContainer extends import('express').Request {
    container: AwilixContainer;
  }
}
