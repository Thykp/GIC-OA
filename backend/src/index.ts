import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import { createContainer, asClass, asValue, InjectionMode } from 'awilix';
import { scopePerRequest } from 'awilix-express';
import client from 'prom-client';

import { CafeRepository } from './repositories/CafeRepository';
import { CafeService } from './services/cafeService';
import { EmployeeRepository } from './repositories/EmployeeRepository';
import { EmployeeService } from './services/EmployeeService';

// Routers
const cafesRouter = require('./routes/cafes');
const employeesRouter = require('./routes/employees');

dotenv.config();
const app = express();
app.use(express.json());

// Metrics
client.collectDefaultMetrics();
app.get('/metrics', (_req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(client.register.metrics());
});

// DI container
const container = createContainer({
    injectionMode: InjectionMode.CLASSIC
  });
  
  container.register({
    supabase: asValue(
        require('@supabase/supabase-js').createClient(
          process.env.SUPABASE_URL!,
          process.env.SUPABASE_ANON_KEY!
        )
      ),
  
    cafeRepository:    asClass(CafeRepository).scoped(),
    cafeService:       asClass(CafeService).scoped(),
  
    employeeRepository: asClass(EmployeeRepository).scoped(),
    employeeService:    asClass(EmployeeService).scoped(),
  });
app.use(scopePerRequest(container));

// Mount routes
app.use('/cafes', cafesRouter);
app.use('/employees', employeesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend listening on http://localhost:${PORT}`));