import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { app } from '../src/app';
import request from 'supertest';

describe('Random Numbers', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to generate 10 random numbers', async () => {
    const response = await request(app.server)
      .get('/random')
      .query({
        max: 10,
        min: 0,
        count: 10,
        no_repeat: false,
      })
      .expect(200);
    expect(response.body.result).toHaveLength(10);
  });
});
