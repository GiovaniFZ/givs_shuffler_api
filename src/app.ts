import fastify from 'fastify';
import cors from '@fastify/cors';
import { ZodError } from 'zod';
import { env } from './infra/schema/env';
import { welcomeHTML } from './infra/http/routes/welcome';
import { generateRandomWords } from './infra/http/routes/randomWords';
import { generateRandomNumbers } from './infra/http/routes/randomNumber';

export const app = fastify();

app.get('/', (_, res) => {
  res.type('text/html').send(welcomeHTML);
});

app.register(generateRandomNumbers);
app.register(generateRandomWords);

app.setErrorHandler((error, _, reply) => {
  if (env.NODE_ENV != 'production') {
    console.error(error);
  }
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation Error',
      issues: error.format(),
    });
  }
  return reply.status(500).send({
    message: 'Internal Server Error',
    error: error.message,
  });
});

app.register(cors, {});
