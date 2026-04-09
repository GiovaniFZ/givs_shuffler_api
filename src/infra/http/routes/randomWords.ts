import { FastifyInstance } from 'fastify';
import { z } from 'zod';

export async function generateRandomWords(app: FastifyInstance) {
  const wordsSchema = z.object({
    words: z.array(z.string()),
    count: z.number(),
  });

  app.post('/randomwords', async (req, res) => {
    const { words, count } = wordsSchema.parse(req.body);
    const wordsSize = words.length;
    const results: string[] = [];
    for (let i = 0; i < count; i++) {
      const randomNumber = Math.floor(Math.random() * (wordsSize + 1));
      results.push(words[randomNumber]);
    }
    res.send({ results });
  });
}
