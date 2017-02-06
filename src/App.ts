import articleRouter from './routes/ArticleRouter';
import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';

import ArticleRepository from './ArticleRepository';

// Creates and configures an ExpressJS web server.
class App {
  public express: express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.initializeMiddleware();
    this.initializeRoutes();
  }

  // Configure Express middleware.
  private initializeMiddleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  private initializeRoutes(): void {
    let router = express.Router();
    router.get('/', (req, res, next) => {
      res.json({
        message: 'Hello World!'
      });
    });

    this.express.use('/', router);
    this.express.use('/api/v1/articles', articleRouter);
  }
}

export default new App().express;