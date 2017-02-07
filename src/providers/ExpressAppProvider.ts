import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import articleRouter from '../routes/ArticleRouter';
import ArticleRepository from '../repositories/ArticleRepository';

export class ExpressAppProvider {
  private express: express.Application;

  constructor() {
    this.express = express();
    this.initializeMiddleware();
    this.initializeRoutes();
  }

  private initializeMiddleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  private initializeRoutes(): void {
    let router = express.Router();
    router.get('/', (req, res, next) => {
      res.status(200).send({ message: 'success' });
    });

    this.express.use('/', router);
    this.express.use('/api/v1/articles', articleRouter);
  }

  public getExpressInstance(): express.Application
  {
    return this.express;
  }
}