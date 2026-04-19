import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { MakeGenerateRandomNumberUseCase } from '../../../domain/application/factories/make-generate-random-number-use-case';

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
    const useCase = MakeGenerateRandomNumberUseCase();
    try {
      const result = useCase.execute({ max, min, count, no_repeat });
      res.send({ result });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({ message: error.message });
      } else {
        res.status(500).send({ message: 'Internal Server Error' });
      }
    }
  });
}
