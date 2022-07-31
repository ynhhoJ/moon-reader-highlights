const fastify = require('fastify')({ logger: true })

type Highlight = {
  title: string;
  text: string;
  author: string;
  chapter: string;
}
type Body = {
  highlights: Array<Highlight>;
}

interface FastifyRequest {
  body: Body;
}

fastify.post('/', async (request: FastifyRequest) => {
  console.log(request.body);

  return { hello: 'world' }
})


const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start().then(() => console.log("[🌙] Moon+ Reader highlight server is up!"));