const restify = require('restify');
const { Client } = require('pg');
const corsMiddleware = require('restify-cors-middleware2');

const server = restify.createServer();

const cors = corsMiddleware({
  preflightMaxAge: 5,
  origins: ['*'],
  allowHeaders: ['X-App-Version'],
  exposeHeaders: [],
});

server.pre(cors.preflight);
server.use(cors.actual);

function newClient() {
  return new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  });
}

server.get('/', async function (req, res) {
  const client = newClient();
  let db_info = 'Database is up & running';
  try {
    await client.connect();
  } catch (e) {
    db_info = 'Cannot connect to database!';
    console.log(e);
  } finally {
    await client.end().catch(() => {});
  }
  res.send({ Server: 'Server is working', Database: db_info });
});

server.get('/room', async function (req, res) {
  const client = newClient();
  let rows = [];
  try {
    await client.connect();
    rows = (await client.query('select * from room')).rows;
  } catch (e) {
    console.log(e);
  } finally {
    await client.end().catch(() => {});
  }
  res.send({ rooms: rows });
});

const PORT = 8080;
server.listen(PORT, function () {
  console.log('%s listening at %s', server.name, server.url);
});