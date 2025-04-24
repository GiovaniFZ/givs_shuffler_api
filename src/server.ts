import 'dotenv/config';
import { env } from './schema/env';
import { app } from './app';

app
  .listen({
    port: Number(env.PORT),
  })
  .then(() => {
    console.log(`HTTP server running at port ${env.PORT}`);
  });
