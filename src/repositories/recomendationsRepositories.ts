import { resourceLimits } from 'worker_threads'
import connection from '../database'

export async function saveNewRecomendation(body:{name:string,youtubeLink:string}){

    const{name,youtubeLink} = body
    
      await connection.query(`INSERT INTO recomendations (name,"youtubeLink",score) VALUES ($1,$2,0)`,[name,youtubeLink])

   
    
}

export async function updateScore(id:number,type:string) {
    console.log(id)
    console.log(type)
    console.log(typeof(type))
    
   
    
    if(type==='+'){
         const result=await connection.query(`
            UPDATE recomendations
            SET score = score + 1 
            WHERE id=($1)
            RETURNING score
            `,
            [id])

           // console.log(result)

            if(result.rows[0].score < -5){
                await connection.query(`DELETE FROM recomendations WHERE id = ($1)`,[id])
            }

            
    }else{
        const result=await connection.query(`
            UPDATE recomendations
            SET score = score - 1 
            WHERE id=($1)
            RETURNING score
            `,
            [id])

            //console.log(result)

            if(result.rows[0].score < -5){
                await connection.query(`DELETE FROM recomendations WHERE id = ($1)`,[id])
            }
    }


    

    
    

 }
    