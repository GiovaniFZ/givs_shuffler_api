import { FastifyInstance } from 'fastify';
import { z } from 'zod';

export async function generateRandomNumbers(app: FastifyInstance) {
  const randomRequestSchema = z.object({
    max: z.coerce.number(),
    min: z.coerce.number(),
    count: z.coerce.number(),
    no_repeat: z
      .string()
      .refine((val) => val === 'true' || val === 'false')
      .transform((val) => val === 'true'),
  });

  app.get('/random', async (req, res) => {
    const { max, min, count, no_repeat } = randomRequestSchema.parse(req.query);
    const result: number[] = [];
    res.send({ result });
  });
}
