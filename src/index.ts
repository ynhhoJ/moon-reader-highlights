import {FastifyReply, FastifyTypeProviderDefault} from "fastify";
import * as http from "http";

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
type FastifyResponse = FastifyReply<http.Server, http.IncomingMessage, http.ServerResponse, any, any, any, FastifyTypeProviderDefault>

interface FastifyRequest {
  body: MoonReaderBodyRequest;
}

fastify.post('/', async (request: FastifyRequest, response: FastifyResponse) => {
  const { body } = request;
  const { highlights } = body;
  
  if (!highlights) {
    return response.callNotFound();
  }
  
  const db = await open({
    filename: './database.db',
    driver: sqlite3.Database
  });

  for (const highlight of highlights) {
    const { title, text, author, chapter } = highlight;

    await db.run(`INSERT INTO highlights values (:id, :author, :title,  :chapter, :text, :highlightedAt)`, {
      ':author': author,
      ':chapter': chapter,
      ':highlightedAt': new Date().toISOString(),
      ':id': undefined,
      ':text': text,
      ':title': title,
    })
  }

  return response.code(200);
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

  await db.exec(`CREATE TABLE
    IF NOT EXISTS highlights (
        id              INTEGER PRIMARY KEY,
        author          TEXT,
        title           TEXT,
        chapter         TEXT,
        text            TEXT,
        highlightedAt   TEXT
    )
  `);
  
  try {
    await fastify.listen(basicFastifyListenOptions);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start().then(() => console.log("[🌙] Moon+ Reader highlight server is up!"));
