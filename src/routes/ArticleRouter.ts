import {Router, Request, Response, NextFunction} from 'express';
import * as repo from '../repositories/ArticleRepository';

export class ArticleRouter
{
    private repository: repo.ArticleRepository;
    public router: Router;
    
    constructor(repository: repo.ArticleRepository){
        this.router = Router();
        this.repository = repository;
        this.router.get('/', this.getAll.bind(this));
        this.router.get('/:id', this.getById.bind(this));
    } 

    public getAll(req: Request, res: Response, next: NextFunction): void
    {
        let articles = this.repository.GetAll();
        if (articles)
        {
            res.status(200).send(articles);
        }
        else
        {
            res.status(404)
                .send({
                    message: 'No data found',
                    status: res.status
                });
        }
    }

    public getById(req: Request, res: Response, next: NextFunction): void 
    {
        let id = parseInt(req.params.id);
        let article = this.repository.GetById(id);
        if (article)
        {
            res.status(200).send(article);
        }
        else
        {
            res.status(404)
                .send({
                    message: 'No article found with the given id=' + id.toString(),
                    status: res.status
                });
        }
    }
}

const articleRepository = new repo.ArticleRepository();
const articleRouter = new ArticleRouter(articleRepository);
export default articleRouter.router;