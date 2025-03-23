import fastify from "fastify";
import cors from '@fastify/cors'

const app = fastify()
app.register(cors, {})

interface ReqQuery {
    max: string,
    min: string,
    count: string,
}

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
    port: 3000,
}).then(() => {
    console.log('HTTP server running')
})