import fastify from "fastify";
import cors from '@fastify/cors'
import "dotenv/config"
import { env } from './schema'
import { welcomeHTML } from "../welcome";
import { generateRandomNumbers } from "./routes/randomNumber";
import { generateRandomWords } from "./routes/randomWords";

const app = fastify()
app.register(cors, {})

app.get('/', (_, res) => {
    res.type('text/html').send(welcomeHTML)
})

app.register(generateRandomNumbers)
app.register(generateRandomWords)

app.listen({
    port: Number(env.PORT),
}).then(() => {
    console.log(`HTTP server running at port ${env.PORT}`)
})