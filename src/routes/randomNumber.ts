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

    console.log(no_repeat);

    if (min > max) {
      return res.status(400).send({ error: 'min is greater than max' });
    }

    if (count <= 0) {
      return res.status(400).send({ error: 'count must be greater than 0' });
    }

    if (no_repeat && count > max - min + 1) {
      return res.status(400).send({ error: 'count is greater than the range of numbers' });
    }

    if (no_repeat) {
      const uniqueNumbers = new Set<number>();
      while (uniqueNumbers.size < count) {
        const number = Math.floor(Math.random() * (max - min + 1) + min);
        uniqueNumbers.add(number);
      }
      result.push(...uniqueNumbers);
    } else {
      for (let i = 0; i < count; i++) {
        const number = Math.floor(Math.random() * (max - min + 1) + min);
        result.push(number);
      }
    }
    res.send({ result });
  });
}
