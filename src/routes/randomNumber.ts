import { FastifyInstance } from "fastify";
import { z } from "zod";

export async function generateRandomNumbers(app: FastifyInstance) {

    const randomRequestSchema = z.object({
        max: z.coerce.number(),
        min: z.coerce.number(),
        count: z.coerce.number(),
    })

    app.get('/random', async (req, res) => {
        let { max, min, count } = randomRequestSchema.parse(req.query)
        let minInt = Number(min);
        let maxInt = Number(max);
        let countInt = Number(count);
        let result: number[] = []

        if (isNaN(minInt) || isNaN(maxInt) || isNaN(countInt) || countInt <= 0) {
            return res.status(400);
        }

        if (minInt > maxInt) {
            return res.status(400);
        }

        for (let i = 0; i < countInt; i++) {
            let number = Math.floor(Math.random() * (maxInt - minInt + 1) + minInt);
            result.push(number)
        }
        res.send({ result })
    })
}