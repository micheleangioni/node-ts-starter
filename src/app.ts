import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import path from 'path';
import api from './api';
import errorsMiddlewareFactory from './api/errorsMiddlewareFactory';
import applicationServices from './application';

import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '../.env') });

// Define a very basic logger
const logger = console;

import infraServices from './infra';

async function loadApp(app: express.Application) {
  /**
   * Attach the infrastructure services to the Application.
   */
  await infraServices(app);

  /**
   * Attach the application services to the Application.
   */
  await applicationServices(app);

  /**
   * Attach the api services to the Application.
   */
  await api(app);

  // The errors middleware needs to be the last one, after the apis
  app.use(errorsMiddlewareFactory());

  return app;
}

export default function (app: express.Application) {
  app.use(helmet());
  app.set('logger', logger);

  /**
   * Configure Body Parser.
   */
  app.use(bodyParser.urlencoded({
    extended: true,
  }));
  app.use(bodyParser.json());

  /**
   * Use CORS and enable pre-flight across all routes.
   */
  app.use(cors({
    allowedHeaders: ['Authorization', 'Content-Type', 'X-Requested-With'],
    exposedHeaders: ['Authorization', 'Content-Type'],
  }));
  app.options('*', cors({
    allowedHeaders: ['Authorization', 'Content-Type', 'X-Requested-With'],
    exposedHeaders: ['Authorization', 'Content-Type'],
  }));

  process.on('uncaughtException', (err) => {
    // tslint:disable-next-line:no-console
    console.log(`${new Date().toISOString()} uncaughtException`, err);
    logger.error(err.message);
    logger.error(err.stack);
    process.exit(1);
  });

  return loadApp(app)
    .then((expressApp) => {
      return { app: expressApp, logger };
    });
}
