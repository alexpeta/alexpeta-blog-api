import * as lokijs from 'lokijs';
import * as fs from 'fs';

export class Repository {
    private static dbFileName: string = 'superheroes.db';
    private static seedDataFileName: string = 'dist\\data.json';
    private db: Loki;
    
    constructor() {
        this.db = new lokijs(Repository.dbFileName, 
        {
            autosave: true,
            autosaveInterval: 500,
            autoload: true
        });
    }

    public Seed(): void {
        var dataFileContents = fs.readFileSync(Repository.seedDataFileName).toString();
        if(!dataFileContents)
        {
            console.log('seed data is null');
            return;    
        }

        var heroesList = JSON.parse(dataFileContents);
        if(!heroesList)
        {
            console.log('could not parse seed data');
            return;    
        }

        var heroCollection = this.db.getCollection('heroes');
        if (!heroCollection)
        {
            this.db.addCollection('heroes');
        }

        heroesList.forEach(hero => {
            heroCollection.insert(hero);
        });

        this.db.saveDatabase();
    }

    public GetById(id: number): any {
        var heroCollection = this.db.addCollection('heroes');
        var foundHero = heroCollection.find({'id':id});
        return foundHero;
    }
}
const repo = new Repository();
export default repo;