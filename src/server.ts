import fastify from "fastify";
 
 const app = fastify()
 
 app.get('/', () => {
     return 'Hello World'
 })
 
 app.listen({
     port: 4000,
 }).then(() => {
     console.log('HTTP server running')
 })