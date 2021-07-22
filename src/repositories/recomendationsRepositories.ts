import connection from '../database'

export async function saveNewRecomendation(body:{name:string,youtubeLink:string}){

    const{name,youtubeLink} = body
    
      await connection.query(`INSERT INTO recomendations (name,"youtubeLink",score) VALUES ($1,$2,0)`,[name,youtubeLink])

   
    
    }
    