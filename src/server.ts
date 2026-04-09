import 'dotenv/config';
import { app } from './app';
import { env } from './infra/schema/env';

app
  .listen({
    port: Number(env.PORT),
  })
  .then(() => {
    console.log(`HTTP server running at port ${env.PORT}`);
  });
