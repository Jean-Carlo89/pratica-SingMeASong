
import { isGeneratorFunction } from 'util/types'
import connection from '../database'
import * as recomendationsServices from '../services/recomendationsServices'


export async function saveNewRecomendation(body:{name:string,youtubeLink:string}){

    const{name,youtubeLink} = body
    
      await connection.query(`INSERT INTO recomendations (name,"youtubeLink",score) VALUES ($1,$2,0)`,[name,youtubeLink])

}

export async function updateScore(id:number,type:string) {
   
       const checkIfIdExist = await connection.query(`
        SELECT * FROM recomendations
        WHERE id = ($1)
        `,[id])
        
        if(!checkIfIdExist.rows[0]){
            return false
        }
    
    
    // if(type==='+'){
    //      const result=await connection.query(`
    //         UPDATE recomendations
    //         SET score = score + 1 
    //         WHERE id=($1)
    //         RETURNING score
    //         `,
    //         [id])

          

    //         if(result.rows[0].score < -5){
    //             await connection.query(`DELETE FROM recomendations WHERE id = ($1)`,[id])
    //         }

            
    // }else{
    //     const result=await connection.query(`
    //         UPDATE recomendations
    //         SET score = score - 1 
    //         WHERE id=($1)
    //         RETURNING score
    //         `,
    //         [id])

           

    //         if(result.rows[0].score < -5){
    //             await connection.query(`DELETE FROM recomendations WHERE id = ($1)`,[id])
    //         }
    // }

    
        let signal;
    if(type==="+"){
        signal = 1
    }else{
        signal= -1
    }

    const result=await connection.query(`
             UPDATE recomendations
             SET score = score + ($2) 
             WHERE id=($1)
             RETURNING score
             `,
            [id,signal])

          

            if(result.rows[0].score < -5){
                await connection.query(`DELETE FROM recomendations WHERE id = ($1)`,[id])
            }

    
    return true
    
    

 }

 export async function getRandom(){
     
     const check = await connection.query(`SELECT * FROM recomendations`)

     if(check.rows.length===0){
         return 404
     }
     
     const random = Math.random()
    
     
     if(random>=0.7){
        let result = await connection.query(`
         SELECT * FROM recomendations
         WHERE score >= 10`
         )

         if(result.rows.length>0){
            
           const  randomArray  = recomendationsServices.randomizeArray(result.rows)
          
          return randomArray[0]
         }else{
            result = await connection.query(`
                SELECT * FROM recomendations
                `
                )

                const  randomArray  = recomendationsServices.randomizeArray(result.rows)

                return randomArray[0]
         }
         
     }else{
        let result = await connection.query(`
        SELECT * FROM recomendations
        WHERE score < 10`
        )

        
        
        if(result.rows.length>0){
            const  randomArray  = recomendationsServices.randomizeArray(result.rows)
          
          return randomArray[0]
         }else{
            result = await connection.query(`
            SELECT * FROM recomendations
            `
            )

            const  randomArray  = recomendationsServices.randomizeArray(result.rows)

            return randomArray[0]
         }
         
     }
 }


 export async function getTop(amount:number){
     const recomendations = await connection.query(`
        SELECT * FROM recomendations
        `)

      const result = recomendationsServices.getAmountNumbersOfRecomendations(recomendations.rows,amount)

      return result
 }
    