import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { makeRandomWordUseCase } from '../../../domain/application/factories/make-random-word-use-case';

export async function generateRandomWords(app: FastifyInstance) {
  const wordsSchema = z.object({
    words: z.array(z.string()),
    count: z.number(),
  });

  app.post('/randomwords', async (req, res) => {
    const { words, count } = wordsSchema.parse(req.body);
    const useCase = makeRandomWordUseCase()
    const results = useCase.execute(count, words, res);
    res.send({ results });
  });
}
