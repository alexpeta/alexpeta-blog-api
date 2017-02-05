import {Router, Request, Response, NextFunction} from 'express';
import Repository from '../Repository';
const Heroes: [any] = require('../data');

export class HeroRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.router.get('/', this.getAll);
    this.router.get('/:id', this.getById);
  }

  public getAll(req: Request, res: Response, next: NextFunction) {
    res.send(Heroes);
  }

  public seedData(req: Request, res: Response, next: NextFunction): void {
    Repository.Seed();

    res.status(200)
    .send({
      message: 'Success',
      status: res.status 
    });
  }

  public getById(req: Request, res: Response, next: NextFunction) {
    let id = parseInt(req.params.id);
    let hero = Heroes.find(hero => <number>(hero.id) === id);

    if(hero)
    {
      res.status(200)
          .send({
            message: 'Success',
            status: res.status,
            hero
          });
    }
    else
    {
      res.status(404)
          .send({
            message: 'No hero found with the given id.',
            status: res.status
          });
    }
  }
}

const heroRoutes = new HeroRouter();
export default heroRoutes.router;