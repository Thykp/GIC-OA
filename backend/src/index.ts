import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import { createContainer, asClass, asValue } from 'awilix';
import { scopePerRequest } from 'awilix-express';
import client from 'prom-client';

const cafesRouter = require('./routes/cafes') as import('express').Router;

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
const container = createContainer();
container.register({
  supabase: asValue(
    require('@supabase/supabase-js').createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!
    )
  )
  // register repositories/services/controllers here...
});
app.use(scopePerRequest(container));

// Mount routes
app.use('/cafes', cafesRouter);
// app.use('/employees', require('./routes/employees'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend listening on http://localhost:${PORT}`));
