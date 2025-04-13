import { FastifyInstance } from 'fastify';
import { z } from 'zod';

export async function generateRandomNumbers(app: FastifyInstance) {
  const randomRequestSchema = z.object({
    max: z.coerce.number(),
    min: z.coerce.number(),
    count: z.coerce.number(),
    no_repeat: z.string(),
  });

  app.get('/random', async (req, res) => {
    const { max, min, count, no_repeat } = randomRequestSchema.parse(req.query);
    const minInt = Number(min);
    const maxInt = Number(max);
    const countInt = Number(count);
    const noRepeatBoolean = no_repeat === 'true';
    const result: number[] = [];

    if (minInt > maxInt) {
      return res.status(400).send({ error: 'min is greater than max' });
    }

    if (noRepeatBoolean && countInt > maxInt - minInt + 1) {
      return res.status(400).send({ error: 'count is greater than the range of numbers' });
    }

    if (noRepeatBoolean) {
      const uniqueNumbers = new Set<number>();
      while (uniqueNumbers.size < countInt) {
        const number = Math.floor(Math.random() * (maxInt - minInt + 1) + minInt);
        uniqueNumbers.add(number);
      }
      result.push(...uniqueNumbers);
    } else {
      for (let i = 0; i < countInt; i++) {
        const number = Math.floor(Math.random() * (maxInt - minInt + 1) + minInt);
        result.push(number);
      }
    }
    res.send({ result });
  });
}
