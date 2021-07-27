import faker from 'faker'
import connection from '../../../src/database'


interface Recomendation{
    name:string;
    youtubeLink:string;
}

export function createNewRecomendation(){
    const body = {
        name:faker.lorem.sentence(),
        youtubeLink:"https://www.youtube.com/watch?v=0Y31v-fRTMw"
    }
    return body
}

export async function getId(recomendation:Recomendation){
    const search =await connection.query(`
        INSERT INTO recomendations (name,"youtubeLink",score) 
        VALUES ($1,$2,0)
        RETURNING id
        `,[recomendation.name,recomendation.youtubeLink])
        
    
    return search.rows[0].id
}

export async function insertNewRecomendation(recomendation:Recomendation) {
    for(let i =0;i<3;i++){
        await connection.query(`INSERT INTO recomendations (name,"youtubeLink",score) VALUES($1,$2,0)`,[recomendation.name,recomendation.youtubeLink])
    }

}