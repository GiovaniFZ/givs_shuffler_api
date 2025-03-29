import { FastifyInstance } from "fastify";
import { number, z } from "zod";

export async function generateRandomWords(app: FastifyInstance){
    const wordsSchema = z.object({
        words: z.array(z.string()),
        count: z.number()
    })

    app.post('/randomwords', async (req, res) => {
        const { words, count } = wordsSchema.parse(req.body)
        let result = []
        res.send(result)
    })
}