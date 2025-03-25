import fastify from "fastify";
import cors from '@fastify/cors'
import "dotenv/config"
import { env } from './schema'
import { z } from "zod";
import packageJson from '../package.json'
import fs from 'fs'
import { welcomeHTML } from "../welcome";

const app = fastify()
app.register(cors, {})

const randomRequestSchema = z.object({
    max: z.number(),
    min: z.number(),
    count: z.number(),
})

type ReqQuery = z.infer<typeof randomRequestSchema>

app.get('/', (_, res) => {
    res.type('text/html').send(welcomeHTML)
})


app.get('/random', (req, res) => {
    let { max, min, count } = req.query as ReqQuery
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
    res.send(result)
})

app.listen({
    port: env.PORT,
}).then(() => {
    console.log('HTTP server running')
})