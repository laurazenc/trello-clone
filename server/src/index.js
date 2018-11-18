import redis from './redis';

import { ghStrategy, ghConnect } from './utils/strategies/githubStrategy';
import { confirmUser } from './modules/user/register/confirmUser';

const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const { GraphQLServer } = require('graphql-yoga');
const passport = require('passport');

require('dotenv').config();

const { genSchema } = require('./schemas');
const { connectDatabase } = require('./db');
const { authMiddleware } = require('./middlewares/authMiddleware');
const { userLoader } = require('./loaders/userLoader');
const { listLoader } = require('./loaders/listLoader');

const { redisSessionPrefix } = require('./utils/constants');

const schema = genSchema();

passport.use(ghStrategy);

const store = new RedisStore({
  client: redis,
  prefix: redisSessionPrefix,
});

connectDatabase();

const middlewares = [authMiddleware];

const server = new GraphQLServer({
  schema,
  context: ({ request, response }) => ({
    redis,
    url: `${request.protocol}://${request.get('host')}`,
    session: request ? request.session : undefined,
    req: request,
    res: response,
    userLoader: userLoader(),
    listLoader: listLoader(),
  }),
  middlewares,
});

server.express.use(
  session({
    secret: process.env.SESSION_SECRET,
    store,
    name: 'qid',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    },
  }),
);

server.express.use(passport.initialize());
server.express.use(passport.session());

server.express.use((req, res, next) => {
  if (!req.session) {
    return next(new Error('oh no')); // handle error
  }
  return next(); // otherwise continue
});

server.express.get('/confirm/:id', confirmUser);

server.express.get('/auth/github', ghConnect, (req, res, next) => {
  next();
});
server.express.get('/auth/github/callback', ghConnect, (req, res, next) => {
  // Successful authentication, redirect home.
  res.redirect('/');
  next();
});

server.start(
  {
    cors: {
      credentials: process.env.NODE_ENV === 'test' ? 'include' : true,
      origin: process.env.NODE_ENV === 'test' ? '*' : process.env.FRONTEND_URL,
    },
    port: process.env.PORT || process.env.SERVER_PORT,
  },
  ({ port }) => {
    console.log(`[⚙️ ] Server is up and running at http://localhost:${port}`);
  },
);
