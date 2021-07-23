import faker from 'faker'
import connection from '../../../src/database'
export function createNewRecomendation(){
    const body = {
        name:faker.lorem.sentence(),
        youtubeLink:"https://www.youtube.com/watch?v=0Y31v-fRTMw"
    }
    return body
}

export async function getId(recomendation:{name:string,youtubeLink:string}){
    const search =await connection.query(`
        INSERT INTO recomendations (name,"youtubeLink",score) 
        VALUES ($1,$2,0)
        RETURNING id
        `,[recomendation.name,recomendation.youtubeLink])
        
    
    return search.rows[0].id
}