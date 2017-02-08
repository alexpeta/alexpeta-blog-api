import * as lokijs from 'lokijs';
import * as fs from 'fs';
import * as models from '../models/Article';

export class ArticleRepository {
    private static collectionName: string = "articles";
    private static dbFileName: string = 'blog.db';
    private static seedDataFileName: string = 'dist\\articles.json';
    private db: Loki;
    
    constructor() {
        this.db = new lokijs(ArticleRepository.dbFileName, 
        {
            autosave: true,
            autosaveInterval: 500,
            autoload: true,
            autoloadCallback: () => this.loadDatabase
        });
    }

    public GetById(id: number): models.Article {
        let result: models.Article = null;
        this.loadDatabase(null);

        var articlesCollection = this.db.getCollection(ArticleRepository.collectionName);
        var lokiResults = articlesCollection.find({'ArticleId':id});

        if (lokiResults.length == 1)
        {
            result = <models.Article>lokiResults[0];
        }

        return result;
    }

    public GetAll(): models.Article[]
    {
        let result: models.Article[] = [];
        this.loadDatabase(null);

        let articlesCollection = this.db.getCollection(ArticleRepository.collectionName);
        let lokiResults: {}[] = articlesCollection.find();
        lokiResults.forEach(a => {
            result.push(<models.Article>a);
        });
        
        return result;
    }

    private loadDatabase(dataOrErr: any| Error): void 
    {
        if (dataOrErr)
        {
            console.log('Error on autoLoadCallback');
            console.log(dataOrErr);
        }

        var articlesCollection = this.db.getCollection(ArticleRepository.collectionName);
        if (!articlesCollection)
        {
            var dataFileContents = fs.readFileSync(ArticleRepository.seedDataFileName).toString();
            if (!dataFileContents)
            {
                console.log('seed data is null');
                return;    
            }

            var articlesList = JSON.parse(dataFileContents);
            if (!articlesList)
            {
                console.log('could not parse seed data');
                return;    
            }

            articlesCollection = this.db.addCollection(ArticleRepository.collectionName);

            articlesList.forEach(article => {
                articlesCollection.insert(article);
            });
            this.db.saveDatabase();
        }
    }
}
const repo = new ArticleRepository();
export default repo;