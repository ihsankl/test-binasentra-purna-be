import './env';
import './db';

import fs from 'fs';
import cors from 'cors';
import path from 'path';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import favicon from 'serve-favicon';
import bodyParser from 'body-parser';
import compression from 'compression';
import * as Sentry from '@sentry/node';
import passport from 'passport';
import mongoose from 'mongoose';

import routes from './routes';
import json from './middlewares/json';
import logger, { logStream } from './utils/logger';
import * as errorHandler from './middlewares/errorHandler';
import { config } from './config/config';
import { jwtStrategy } from "./config/passport"
import { authLimiter } from './middlewares/rateLimiter';

// Initialize Sentry
// https://docs.sentry.io/platforms/node/express/
Sentry.init({ dsn: process.env.SENTRY_DSN });

const app = express();

const APP_PORT =
  (process.env.NODE_ENV === 'test' ? process.env.TEST_APP_PORT : process.env.APP_PORT) || process.env.PORT || '3000';
const APP_HOST = process.env.APP_HOST || '0.0.0.0';

const pathToSwaggerUi = require('swagger-ui-dist').absolutePath();

app.set('port', APP_PORT);
app.set('host', APP_HOST);

app.locals.title = process.env.APP_NAME;
app.locals.version = process.env.APP_VERSION;

// This request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

app.use(favicon(path.join(__dirname, '/../public', 'favicon.ico')));
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('tiny', { stream: logStream }));
app.use(bodyParser.json());
app.use(errorHandler.bodyParser);
app.use(json);
// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/v1/auth', authLimiter);
}

// API Routes
app.use('/api', routes);

// Swagger UI
// Workaround for changing the default URL in swagger.json
// https://github.com/swagger-api/swagger-ui/issues/4624
const swaggerIndexContent = fs
  .readFileSync(`${pathToSwaggerUi}/index.html`)
  .toString()
  .replace('https://petstore.swagger.io/v2/swagger.json', '/api/swagger.json');

app.get('/api-docs/index.html', (req, res) => res.send(swaggerIndexContent));
app.get('/api-docs', (req, res) => res.redirect('/api-docs/index.html'));
app.use('/api-docs', express.static(pathToSwaggerUi));

// This error handler must be before any other error middleware
app.use(Sentry.Handlers.errorHandler());

// Error Middleware
app.use(errorHandler.genericErrorHandler);
app.use(errorHandler.methodNotAllowed);

let server;

mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info('Connected to MongoDB');
  server = app.listen(app.get('port'), app.get('host'), () => {
    logger.info(`Server started at http://${app.get('host')}:${app.get('port')}/api`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error('Unexpected error', error);
  exitHandler();
};

// Catch unhandled rejections
process.on('unhandledRejection', unexpectedErrorHandler);

// Catch uncaught exceptions
process.on('uncaughtException', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});

export default app;
