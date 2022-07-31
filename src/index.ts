const fastify = require('fastify')({ logger: true })

type Highlight = {
  title: string;
  text: string;
  author: string;
  chapter: string;
}
type MoonReaderBodyRequest = {
  highlights: Array<Highlight>;
}

interface FastifyRequest {
  body: MoonReaderBodyRequest;
}

fastify.post('/', async (request: FastifyRequest) => {
  console.log(request.body);

  return { hello: 'world' };
});

// NOTE: Set this variable to false if you want to stop listening on all available IPv4 interfaces
//       https://www.fastify.io/docs/latest/Guides/Getting-Started/#your-first-server
const shouldListenAllIpv4 = true;
const basicFastifyListenOptions = {
  port: 3000,

  host: shouldListenAllIpv4 ? '0.0.0.0' : undefined,
};

const start = async () => {
  try {
    await fastify.listen(basicFastifyListenOptions);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start().then(() => console.log("[🌙] Moon+ Reader highlight server is up!"));