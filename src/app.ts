import fastify from 'fastify';
import cors from '@fastify/cors';
import { generateRandomNumbers } from './routes/randomNumber';
import { generateRandomWords } from './routes/randomWords';

export const app = fastify();

app.get('/', (_, res) => {
  res.type('text/html').send(welcomeHTML);
});

app.register(generateRandomNumbers);
app.register(generateRandomWords);

app.register(cors, {});
