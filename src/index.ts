const fastify = require('fastify')({ logger: true })
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

type Highlight = {
  author: string;
  chapter: string;
  text: string;
  title: string;
}
type MoonReaderBodyRequest = {
  highlights: Array<Highlight> | undefined;
}

interface FastifyRequest {
  body: MoonReaderBodyRequest;
}

fastify.post('/', async (request: FastifyRequest) => {
  const { body } = request;
  const { highlights } = body;
  
  if (!highlights) {
    return 404;
  }
  
  const db = await open({
    filename: './database.db',
    driver: sqlite3.Database
  });

  for (const highlight of highlights) {
    const { title, text, author, chapter } = highlight;

    await db.run(`INSERT INTO highlights values (:title, :text, :author, :chapter)`, {
      ':title': title,
      ':text': text,
      ':author': author,
      ':chapter': chapter,
    })
  }

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
  const db = await open({
    filename: './database.db',
    driver: sqlite3.Database
  });

  await db.exec("CREATE TABLE IF NOT EXISTS highlights (title Text, text Text, Author Text, Chapter Text)");
  
  try {
    await fastify.listen(basicFastifyListenOptions);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start().then(() => console.log("[🌙] Moon+ Reader highlight server is up!"));
